// Initializes/defines the output pin of the LM35 temperature sensor
int outputpin = 0;

// This sets the ground pin to LOW and the input voltage pin to high
void setup() {
  // Initialize serial communication for debugging at a baud rate of 9600
  Serial.begin(9600);
}

void loop() {
  // Read the raw analog voltage from the LM35 sensor
  int rawvoltage = analogRead(outputpin);
  
  // Convert the raw voltage to millivolts (LM35 outputs 10 mV per degree Celsius)
  float millivolts = (rawvoltage / 1024.0) * 3300;
  
  // Convert millivolts to degrees Celsius
  float celsius = millivolts / 10;

  // Print the temperature in degrees Celsius to the serial monitor
  Serial.print(celsius);
  Serial.println(" degrees Celsius, ");

  // Delay for 1 second before taking another reading
  delay(1000);
}
