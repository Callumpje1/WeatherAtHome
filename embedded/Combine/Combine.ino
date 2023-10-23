#include <LiquidCrystal_I2C.h>
#include <DHT.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WebServer.h>
#include <WiFiClient.h>
#include <ArduinoJson.h>

// Constants won't change.
#define DHTPIN 14
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

// Set web server port number to 80
ESP8266WebServer webserver(80);

const char* ssid = "RM";
const char* password = "Bellum97!";

const char* serverName = "http://rnuhl-178-84-238-34.a.free.pinggy.online/php/post_measured_data.php?";

const int buttonPin = 2;  // the number of the pushbutton pin
int redpin = 12;          // select the pin for the red LED
int bluepin = 15;         // select the pin for the blue LED
int greenpin = 13;        // select the pin for the green LED

// Variables will change:
bool lcdState = true;         // Start with the LCD in the ON state
bool lastButtonState = HIGH;  // the previous reading from the input pin

unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 50;  // Adjust this value as needed

unsigned long lastTime = 0;

unsigned long timerDelay = 300000;

// Global variables for min and max temperature
double minTemp = 18.0;
double maxTemp = 24.0;

double lastTemperature = 0.0;  // Initialize with an out-of-range value
double lastHumidity = 0.0;     // Initialize with an out-of-range value

// Define the LCD
LiquidCrystal_I2C lcd(0x27, 16, 2);

// Function to map temperature to RGB colors
void mapTemperatureToRGB(double temp) {
  if (temp < minTemp) {
    analogWrite(redpin, 0);     // No red
    analogWrite(bluepin, 255);  // Full intensity blue, no green
    analogWrite(greenpin, 0);   // No green
  } else if (temp > minTemp && temp < maxTemp) {
    analogWrite(redpin, 0);      // No red
    analogWrite(bluepin, 0);     // No blue
    analogWrite(greenpin, 255);  // Full intensity green, no red or blue
  } else {
    analogWrite(redpin, 255);  // Full intensity red, no green or blue
    analogWrite(bluepin, 0);   // No blue
    analogWrite(greenpin, 0);  // No green
  }
}

void handleData() {
  // Check if the HTTP method is POST
  if (webserver.method() == HTTP_POST) {
    // Parse the JSON data
    String json = webserver.arg("plain");
    DynamicJsonDocument doc(256);  // Adjust the JSON buffer size accordingly
    DeserializationError error = deserializeJson(doc, json);

    if (error) {
      // Error parsing JSON
      webserver.send(400, "application/json", "{ \"error\": \"Parsing Json error\" }");
    } else {
      // JSON parsed successfully
      minTemp = doc["minTemp"];
      maxTemp = doc["maxTemp"];

      webserver.send(200, "application/json", "{\"message\": \"Data received and processed successfully\"}");
    }
  }
}

void setup() {
  // Enable the internal pull-up resistor on the button pin
  pinMode(redpin, OUTPUT);
  pinMode(bluepin, OUTPUT);
  pinMode(greenpin, OUTPUT);
  pinMode(buttonPin, INPUT_PULLUP);

  Serial.begin(9600);  // Initialize serial communication

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());

  // Start Web Server
  webserver.on("/range", HTTP_POST, handleData);

  webserver.begin();

  lcd.init();       // Initialize the LCD
  lcd.backlight();  // Turn on the backlight
  lcd.setCursor(0, 0);
  lcd.print("Welcome");
  dht.begin();
  delay(2000);
  lcd.clear();
}

void loop() {
  webserver.handleClient();

  // Read the state of the switch into a local variable:
  bool buttonState = digitalRead(buttonPin);

  if (buttonState != lastButtonState) {
    // Check if the button state has changed
    if ((millis() - lastDebounceTime) > debounceDelay) {
      if (buttonState == LOW) {
        lcdState = !lcdState;  // Toggle the LCD state
        if (lcdState) {
          lcd.backlight();
        } else {
          lcd.noBacklight();
          lcd.off();
        }
      }
      lastDebounceTime = millis();
    }
    lastButtonState = buttonState;
  }

  // Read temperature and humidity
  double temp = dht.readTemperature();
  double hum = dht.readHumidity();

  mapTemperatureToRGB(temp);

  // Only update the LCD when temperature or humidity changes
  if (temp != lastTemperature || hum != lastHumidity) {
    lcd.setCursor(0, 0);
    lcd.print("Temp: ");
    lcd.print(temp, 1);  // Display 1 decimal place
    lcd.print("C");

    lcd.setCursor(0, 1);
    lcd.print("Humidity: ");
    lcd.print(hum, 1);  // Display 1 decimal place
    lcd.print("%");
    lastTemperature = temp;
    lastHumidity = hum;
  }

  // Send an HTTP POST request every 5 minutes
  if ((millis() - lastTime) > timerDelay) {
    // Check WiFi connection status
    if (WiFi.status() == WL_CONNECTED) {
      WiFiClient client;
      HTTPClient http;

      // Your Domain name with URL path or IP address with path
      http.begin(client, serverName);

      // Specify content-type header
      http.addHeader("Content-Type", "application/json");

      // create a Json object
      DynamicJsonDocument doc(256);

      doc["temperature"] = temp;
      doc["humidity"] = hum;

      String jsonString;

      serializeJson(doc, jsonString);

      http.POST(jsonString);

      // Disconnect
      http.end();
    } else {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}
