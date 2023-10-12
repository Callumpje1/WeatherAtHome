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
void loop(){
  // Send an HTTP POST request every 10 seconds
  if ((millis() - lastTime) > timerDelay)
  {
    // Check WiFi connection status
    if (WiFi.status() == WL_CONNECTED)
    {
      WiFiClient client;
      HTTPClient http;

      // Your Domain name with URL path or IP address with path
      http.begin(client, serverName);

      // Specify content-type header
      http.addHeader("Content-Type", "application/json");

      // create a Json object
      DynamicJsonDocument doc(200);

      doc["temperature"] = dht.readTemperature();
      doc["humidity"] = dht.readHumidity();

      String jsonString;
      
      serializeJson(doc, jsonString);

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
[Insert code snippet(s) proving the requirement is fulfilled here]

##EMBRQ#02
[Insert text explaining how you fulfilled the requirement here]

Code:
[Insert code snippet(s) proving the requirement is fulfilled here]

##EMBRQ#03
[Insert text explaining how you fulfilled the requirement here]

Code:
[Insert code snippet(s) proving the requirement is fulfilled here]

##EMBRQ#04
[Insert text explaining how you fulfilled the requirement here]

Code:
[Insert code snippet proving the requirement is fulfilled here]

##EMBRQ#05
[Insert text explaining how you fulfilled the requirement here]

Code:
[Insert code snippet proving the requirement is fulfilled here]