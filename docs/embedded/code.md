# Embedded code

## LM35 Temperature Sensor

During my first encounter with the Wemos D1 I was able to connect the LM35 Temperature sensor so i can read out the current temperature. To Achieve this i needed to read the raw analog voltage from the sensor. Next the raw voltage had to be converted to millivolts so that a represantable temperature value could be calculated. [See Code Here](https://gitlab.fdmci.hva.nl/IoT/2023-2024-semester-1/individual-project/iot-svadkoc/-/blob/8bd7aae81da8f2acf82b724e639a5dfc17b77f98/embedded/wemos-temperature/Temperature_sketch.ino)

## Tactile Button

The second part of working with the Wemos D1 was figuring out how to connect a button to the microcontroller so the user can control when the temperature is shown. To do this i had to connect a 10k Ohm resistor to the button so i could be ablo to read the button state and debounce the button when needed. The code for this part was quite simple. First the input pin for the button is declared. Then I keep track of the led and button state with a declared variable so we know in which state they are and can change them accordingly. I also added a buffer to prevent changes by noise. The code reads the current state of the button and changes the built-in led accordingly. [See Code Here](https://gitlab.fdmci.hva.nl/IoT/2023-2024-semester-1/individual-project/iot-svadkoc/-/blob/main/embedded/Button_sketch/Button_sketch.ino?ref_type=heads)

## DHT-22 Sensor

After making progress in the other slices of the project i realised the LM35 temperature sensor wouldn't give me enough data to crowd my webapplication. That's why i chose to purchase a DHT-22 sensor that can not only measure the temperature but also gives a humidity percentage. This way i can give the user more information about the conditions inside their house. Setting up the DHT-22 was quite straightforward. After wiring up the sensor we add the dht library and declare the type of pin and where the pin is connected to the Wemos D1 mini. Afterwards we start the dht sensor with dht.begin(). In the loop we read the current temperature in celsius and the humidity with dht.readTemperature() and dht.readHumidity() and write them to the Serial monitor. [See Code Here](https://gitlab.fdmci.hva.nl/IoT/2023-2024-semester-1/individual-project/iot-svadkoc/-/blob/main/embedded/Dht-22/Dht-22.ino?ref_type=heads)

## KY-016 RGB Module

The next part to add to the embedded device is the rgb-led module. This rgb light will change colors based on the current temperature. To get the rgb led working properly we first define to which pins the red,blue and green connectors are attached. Afterwards we set the pin mode for each of the colored pins, in this case they are all used as outputs. In the loop we check the temperature and display a different color on the led based on the temperature. To change the led color we adjust the amount of each color that is displayed to get the desired color. In my case i only need full brightness red, blue and green so no need to mix colors. [See Code Here](https://gitlab.fdmci.hva.nl/IoT/2023-2024-semester-1/individual-project/iot-svadkoc/-/blob/main/embedded/Rgb_led/Rgb_led.ino?ref_type=heads)

## 1602 LCD

The final part that has to be added to the embedded device is the 16x2 Lcd display to show the user what the current temperature and humidity is inside their house. To get the Lcd working we first include the LiquidCrystal i2c library so our Wemos D1 Mini can communicate with the display. In the setup we initialize the display and turn the backlight on. In the loop we read the conditions from the dht-22 sensor. If the values change the text on the display also changes accordinly, this way the display doesn't update when the temperature or humidity doesn't change, we save the last readings in a variable so we can check it in the next loop.  [See Code Here](https://gitlab.fdmci.hva.nl/IoT/2023-2024-semester-1/individual-project/iot-svadkoc/-/blob/main/embedded/Rgb_led/Rgb_led.ino?ref_type=heads)
