int redpin = 16;   // select the pin for the red LED
int bluepin = 12;  // select the pin for the blue LED
int greenpin = 14; // select the pin for the green LED
int temperature = 17;

void setup() {
  pinMode(redpin, OUTPUT);
  pinMode(bluepin, OUTPUT);
  pinMode(greenpin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (temperature<18){
  analogWrite(redpin, 0);     // No red
  analogWrite(bluepin, 255);  // Full intensity blue, no green
  analogWrite(greenpin, 0);   // No green
  delay(2000); // Delay for 1 second (adjust as needed)
  } else if (temperature >18 && temperature<25){
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

