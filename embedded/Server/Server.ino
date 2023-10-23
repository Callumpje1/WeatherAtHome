#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <DHT.h>

#define DHTPIN 14
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

// Replace with your network credentials
const char* ssid = "RM";
const char* password = "Bellum97!";

// Set web server port number to 80
ESP8266WebServer webserver(80);

// LED pins
int redpin = 12;   // select the pin for the red LED
int bluepin = 15;  // select the pin for the blue LED
int greenpin = 13; // select the pin for the green LED

// Global variables for min and max temperature
double minTemp = 18.0;
double maxTemp = 24.0;

// Interval for temperature readings (in milliseconds)
const unsigned long temperatureInterval = 2000; // 2 seconds
unsigned long previousTemperatureMillis = 0;

// Function to map temperature to RGB colors
void mapTemperatureToRGB(double temp) {
  if (temp < minTemp) {
    analogWrite(redpin, 0);     // No red
    analogWrite(bluepin, 255);  // Full intensity blue, no green
    analogWrite(greenpin, 0);   // No green
  } else if (temp > minTemp && temp < maxTemp) {
    analogWrite(redpin, 0);     // No red
    analogWrite(bluepin, 0);    // No blue
    analogWrite(greenpin, 255); // Full intensity green, no red or blue
  } else {
    analogWrite(redpin, 255);   // Full intensity red, no green or blue
    analogWrite(bluepin, 0);    // No blue
    analogWrite(greenpin, 0);   // No green
  }
}

void handleData() {
  // Check if the HTTP method is POST
  if (webserver.method() == HTTP_POST) {
    // Parse the JSON data
    String json = webserver.arg("plain");
    DynamicJsonDocument doc(256); // Adjust the JSON buffer size accordingly
    DeserializationError error = deserializeJson(doc, json);
    
    if (error) {
      // Error parsing JSON
      webserver.send(400, "application/json", "{ \"error\": \"Parsing Json error\" }");
    } else {
      // JSON parsed successfully
      minTemp = doc["minTemp"];
      maxTemp = doc["maxTemp"];

      // Add your code here to handle the received data, e.g., controlling the LEDs
      // You can use the 'temperature' value for your logic
      Serial.println("Min Temp: " + String(minTemp));
      Serial.println("Max Temp: " + String(maxTemp));

      webserver.send(200, "application/json", "{\"message\": \"Data received and processed successfully\"}");
    }
  } 
}

void setup() {
  Serial.begin(115200);
  Serial.println();

  pinMode(redpin, OUTPUT);
  pinMode(bluepin, OUTPUT);
  pinMode(greenpin, OUTPUT);

  analogWrite(redpin, 0);     // No red
  analogWrite(bluepin, 0);    // No blue
  analogWrite(greenpin, 255); // Full intensity green

  //Begin WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
  }

  // WiFi Connected
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());

  // Start Web Server
  webserver.on("/range", HTTP_POST, handleData);
  webserver.begin();
}

void loop() {

  double temp = dht.readTemperature();
  
  mapTemperatureToRGB(temp);
  
  webserver.handleClient();
}

