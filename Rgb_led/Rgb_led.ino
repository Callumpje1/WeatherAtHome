#include <DHT.h>

#define DHTPIN 14
#define DHTTYPE DHT22
DHT dht(DHTPIN, DHTTYPE);

int redpin = 12;   // select the pin for the red LED
int bluepin = 15;  // select the pin for the blue LED
int greenpin = 13; // select the pin for the green LED

float hum;  //Stores humidity value
float temp; //Stores temperature value

void setup() {
  pinMode(redpin, OUTPUT);
  pinMode(bluepin, OUTPUT);
  pinMode(greenpin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  hum = dht.readHumidity();
  temp= dht.readTemperature();

  Serial.print(temp);
  Serial.print(hum);

  if (temp<18){
  analogWrite(redpin, 0);     // No red
  analogWrite(bluepin, 255);  // Full intensity blue, no green
  analogWrite(greenpin, 0);   // No green
  delay(2000); // Delay for 1 second (adjust as needed)
  } else if (temp >18 && temp<25){
  analogWrite(redpin, 0);     // No red
  analogWrite(bluepin, 0);    // No blue
  analogWrite(greenpin, 255); // Full intensity green, no red or blue
  delay(2000); // Delay for 1 second (adjust as needed)
  } else {
  analogWrite(redpin, 255);   // Full intensity red, no green or blue
  analogWrite(bluepin, 0);    // No blue
  analogWrite(greenpin, 0);   // No green
  delay(2000); // Delay for 1 second (adjust as needed)
  }
}

