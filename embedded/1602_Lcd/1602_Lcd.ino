#include <DHT.h>
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>

//Constants
#define DHTPIN 14
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

float lastTemp = 0.0;
float lastHumidity = 0.0;

void setup() {

  lcd.init();

  lcd.backlight();

}

void loop() {
  
  //Read data and store it to variables hum and temp
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (temperature != lastTemp || humidity != lastHumidity) {
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Temperature:" + String(temperature,1));
    lcd.setCursor(0, 1);
    lcd.print("Humidity:  "+ String(humidity,1) +"%");

    lastTemp = temperature;
    lastHumidity = humidity;
  }

}

