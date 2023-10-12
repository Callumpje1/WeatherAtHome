# Requirements

|Requirement ID#|Requirement|MoSCoW|Compliant|
|---|---|---|---|
|EMBRQ#01|Embedded device sends measured sensordata to the application backend over http or https.|Must|Yes|
|EMBRQ#02|Embedded device receives or retrieves status messages from the application backend over http or https.|Must|Yes|
|EMBRQ#03|Embedded device contains a dht-22 sensor to read temperature and humidity data|Must|Yes|
|EMBRQ#04|Embedded device contains a tactile button for switching the lcd's backlight on or off|Must|Yes|
|EMBRQ#05|Embedded device contains a rgb-module to display different colors based on the current temperature|Must|Yes|
|EMBRQ#06|Embedded device contains a 16x2 lcd for displaying current temperature and humidity|Must|Yes|
|EMBRQ#07|The embedded device uses the wifi manager for configuration of SSID, User ID (UID) en Password (PWD) for connecting to the network.|Must|Yes|

##EMBRQ#01
We start of with connecting to wifi with the ESP8266WiFi library by using our ssid and password. Then a variable is created for the endpoint in our php to which the data will be sent. We also add a delay timer so data is only sent once every 10 seconds. If the device connects to the wifi and is outside the timer delay we create a HTTP client using the ESP8266HTTPClient library. We then specify the content type to Json and create a JSON object with the temperature and humidity data which is collected from the temperature sensor. Then the json data is serialized into a JSON string and sent to the server via a HTTP POST request. 

Code:
```
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char *serverName = "http://rnuqm-145-28-186-143.a.free.pinggy.online/php/data_post.php";

unsigned long lastTime = 0;
unsigned long timerDelay = 10000;

void loop(){
  // Send an HTTP POST request every 10 seconds
  if ((millis() - lastTime) > timerDelay)
  {
    // Check WiFi connection status
    if (WiFi.status() == WL_CONNECTED)
    {
      WiFiClient client;
      HTTPClient http;

      // Domain name with URL path or IP address with path
      http.begin(client, serverName);

      // Specify content-type header
      http.addHeader("Content-Type", "application/json");

      // create a Json object
      DynamicJsonDocument doc(200);

      doc["temperature"] = dht.readTemperature();
      doc["humidity"] = dht.readHumidity();

      String jsonString;
      
      // Serialize the Json object
      serializeJson(doc, jsonString);

        // Post Json object to server
      http.POST(jsonString);

      // Disconnect
      http.end();
    }
    else
    {
      Serial.println("WiFi Disconnected");
    }
    lastTime = millis();
  }
}
```

##EMBRQ#02

[Insert text explaining how you fulfilled the requirement here]

Code:

##EMBRQ#03
Fulfilling this requirement was quite straightforward. We first include the DHT library and define the type of our dht sensor, which in my case is the dht22 and define the pin to which the sensor is connected. We then begin reading from the sensor with dht.begin(). In the loop we read the temperature and humidity from the sensor with the dht.readTemperature() or .readHumidity() functions. The functions inside the library already convert the raw voltage to temperature in celsius and humidity in a percentage. In the code below the values are only showed in the Serial monitor, in the final use case the data is sent to the php webserver.

Code:
```
#include <DHT.h>

#define DHTPIN 14
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

void setup() { 
    dht.begin();
}

void loop(){   
    double temperature = dht.readTemperature();
    double humidity = dht.readHumidity();

    Serial.print("Temperature: ")
    Serial.println(temperature)

    Serial.print("Humidity: ")
    Serial.println(humidity)
}

```

##EMBRQ#04
At the moment the button doesn't toggle the backlight on or off but all the functionalities are there for it. We first define our constant which is the pin where the button is connected and variables which will hold values to toggle the built in led from HIGH to LOW, when we start the led is switched on. We also define a debounce delay so the functionality of the button won't be affected by any noise. In the setup we define what we want to use the button and led for and turn the led on. In the loop we first read the state of the button and store it in a variable. If the button state has changed we reset the debounce timer. If the button changed to HIGH we also change the state of the led. This simulated how the button will turn the backlight of the lcd on or off based on the last state of the button. We then set the led to the correct state and save the last button state in our variable.

Code:
```
// Constants
const int buttonPin = 4;  

// Variables
int ledState = HIGH;
int buttonState;
int lastButtonState = LOW;

unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 50;    // the debounce time; increase if the output flickers

void setup() {
  pinMode(buttonPin, INPUT);

  pinMode(LED_BUILTIN, OUTPUT);

  digitalWrite(LED_BUILTIN, ledState);
}

void loop() {
  // read the state of the switch into a local variable:
  int reading = digitalRead(buttonPin);

  // If the switch changed, due to noise or pressing:
  if (reading != lastButtonState) {
    // reset the debouncing timer
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    // if the button state has changed:
    if (reading != buttonState) {
      buttonState = reading;
      // only toggle the LED if the new button state is HIGH
      if (buttonState == HIGH) {
        ledState = !ledState;
      }
    }
  }

  // set the LED:
  digitalWrite(LED_BUILTIN, ledState);

  // save the reading, it'll be the lastButtonState:
  lastButtonState = reading;
}
```

##EMBRQ#05
We first define the pins to which the red,blue and green wires of the rgb module are connected. In our setup we define what we want to use the pins for, in this case all pins will be used for output. In the loop we read the temperature data from the DHT-22 sensor and base the color of our rgb module on the current temperature conditions. A cold temperature turns the led blue, a comfortable temperature turns the led greend and a hot temperature turns the led to red. The color of the led is changed by determining the amount of red,green and blue we want the led to show.

Code:
```
#include <DHT.h>

// Variables

int redpin = 14;
int bluepin = 13;
int greenpin = 12;

void setup() {
  pinMode(redpin, OUTPUT);
  pinMode(bluepin, OUTPUT);
  pinMode(greenpin, OUTPUT);
}

void loop() {
    // Store dht temperature data
    temp = dht.readTemperature();

    // Update rgb color based on temperature
    if (temp<18){
    analogWrite(redpin, 0);     // No red
    analogWrite(bluepin, 255);  // Full intensity blue, no green
    analogWrite(greenpin, 0);   // No green
    } else if (temp >18 && temp<25){
    analogWrite(redpin, 0);     // No red
    analogWrite(bluepin, 0);    // No blue
    analogWrite(greenpin, 255); // Full intensity green, no red or blue
    } else {
    analogWrite(redpin, 255);   // Full intensity red, no green or blue
    analogWrite(bluepin, 0);    // No blue
    analogWrite(greenpin, 0);   // No green
  }
}
```

##EMBRQ#06
Embedded device contains a 16x2 lcd for displaying current temperature and humidity

Code:
[Insert code snippet proving the requirement is fulfilled here]

##EMBRQ#07
We first define our network's ssid and password to connect to. In the setup of our code we attempt to connect to the network with the ESP8266WiFi Library using WiFi.begin() with our ssid and password variables. We then give the user feedback via the Serial monitor to let them know if we are connected, if we are connected the current IP address will be showed to the user.

Code:
```
#include <ESP8266WiFi.h>

const char *ssid = "iotroam";
const char *password = "8iuZwH958F";

void setup()
{
    // Attempt to connect to the Wi-Fi network
    WiFi.begin(ssid, password);
    Serial.println("Connecting");
  
    // Wait for the connection to be established
    while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  
    Serial.println("");
    Serial.print("Connected to WiFi network with IP Address: ");
    Serial.println(WiFi.localIP());
}
```