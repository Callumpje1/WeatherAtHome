#include <DHT.h>

#define DHTPIN 16
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

int redpin = 14;   // select the pin for the red LED
int bluepin = 13;  // select the pin for the blue LED
int greenpin = 12; // select the pin for the green LED

float hum;  //Stores humidity value
float temp; //Stores temperature value

void setup() {
  pinMode(redpin, OUTPUT);
  pinMode(bluepin, OUTPUT);
  pinMode(greenpin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  delay(2000);
  hum = dht.readHumidity();
  temp = dht.readTemperature();

  Serial.println(hum);
  Serial.println(temp);

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

