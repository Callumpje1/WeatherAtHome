# Design

## Concept

### User and User Needs

At first i had chosen to make a star-wars themed weather station to appeal to the millions of star-wars fans around the world. However this concept showed to be a lot more complex to create then expected at first and didn't seem to work out the way i wanted it to. It was very hard to create a clear yoda character that would into eachtother without any glue. Due to these complications i chose to completely change my design.

Amsterdam, the city where i was born and where i have lived all my life. The city center has one thing that really stands out and is loved by most inhabitants of Amsterdam, the canal houses! These housed were built in the 17th century and where used for residences, storage units, and business during the dutch Golden Age. Nowadays these houses are some of the most expensive in the city meaning only the ultra rich can enjoy the design and heritage of the canal houses.
That's why i chose to create a weather station that resembles an Amsterdam canal house. This way anyone can own a small version of their favourite canal house at home.

### Goals of the Product

The goal of the product is to give everyone who loves the Amsterdam canal houses a chance to own their own one. This mini version is not only relevant due to the design that resembles the canal houses. A lot of the houses in Amsterdam, especially the older ones, don't have a reliable thermometer that gives the homeowners the information they need to be able to live in a comfortable temperature. That's why i chose to turn this mini canal house into a weather station. This weather station will give users the real-time temperature and humidity in their house. These values can be read out from a lcd screen by pressing a button. Next to the lcd screen the house will also have a led light which will give the user a color based on the temperature inside. This led light will change to red if it is too hot inside, green if the temperature is just right and blue when it's too cold inside.

### Requirements

In the below image you will see the requirements that i have set up for the physical design. The requirements contain some that are specific for the user that will use the product and some that are specific to the manufacturer of the product.

![Requirements Board Physical Design](../assets/Requirements_phyisical.png)

### Sketches

Below you will find the sketch i created to get an idea for how the product will look. In the sketch i decided to draw the overall look of the house aswell as how the laser cut should look to be able to fit the parts together. The front face of the house will hold the lcd screen and button to control the screen for energy saving purposes. The display itself will display the current temperature and humidity within the users home. The top front of the house will have a windowd which will hold a rgb led. This led will change color based on the temperature. The color of the led will indicate that the user may need to decrease or increase the temperature in their home. The top of the box itself will have 4 slots that will be used to attach the roof. The slots will have a width of 5mm, this is the same thickness as the wood i want to use for the product. The sketch also shows some details like the shield at the top of the house and the front door. These details will be engraved into the product to give a premium and detailed look to the house.

 In the paper prototype i printed out the dxf version of my design to get an idea for how all the parts will fit into eachtother. After printing and cutting out the design i realised that i needed to be more precise when creating the slots for the roof. After this i made some changes to my dxf design in Inkscape to make the parts fit into eachtother perfectly.

![Canal House Sketch & Paper Prototype](../assets/Canal_House_Sketch&Prototype.png)

## Digital Manufacturing

### The Device

To create my desired design i will be using the BRM 6090 laser cutter which is available to us at the maker's lab. This machine has the possibility to cut and engrave materials with extreme precision. This machine keeps track of the material you are using and cuts accordingly, no need for measuring the distance of the laser to the material you are cutting. This makes it a lot easier to cut and engrave after eachother without changing the setup myself.

### The Material

I have chosen to create the canal house with 5mm mdf wood. I have chosen this material because it has a premium feel to it and i want my product to resemble the canal houses which are very expensive in real life. Also the material is very smooth and easy to work with. In my final design i don't only want to cut using the laser cutter, i also want to engrave and perhaps paint the surface so it comes as close as possible to a real canal house. For all these applications this wood suits the best. Also this wood fits together well when a right KERF is used to cut, this way the house can be assembled without glue.

## Digital Design

To Design the canal house i decided to first draw a sketch so i could get an idea of how i would create it. The first sketch is displayed in Sketches in a previous paragraphs. After drawing the sketch i decided to create a first prototype with paper to see if my design would work. To create the first prototype i used the Inkscape, this software is easy to use and can save a design in many file types that are supported by the laser cutting software: Lasercut. After recreating my sketch in Inkscape i printed the design on a A4 paper and cut it out to see if the concept would work. The paper prototype seemed like it would work. Because of this i decided to go to the Makerslab and laser cut the design to see what it would look. When laser cutting the design i realised that there were a couple of issues with my initial design. The way i had decided to create the house was not going to make it possible to attach a roof easily, which is essential for my design to work with the embedded device's LED. I had also not calculated the KERF of the machine correctly which meant the parts didn't fit together properly.

![First design iteration](Insert image)

When creating the second iteration of my design i knew that i had to come up with a better way to design the roof and that i had to apply the right amount of KERF to make the pieces fit together seamlessly without glue.
So in my final iteration i created a different version of the roof by placing a inkscape node in the middle of my house and extending it to make a point that would resemble the roof, the roof has 2 finger slots to place the roof panels onto. I then measured the depth of the house to create the roofpanels with 2 slots on each side to connect to the slots in the house. By doing this i knew the roof would fit without too much effort.
In this iteration i also decided to place the window higher in the house to spread all components and make it feel more like a real house. When i started laser cutting my design i needed a couple of tries to figure out what the kerf of the laser cutter was. After doing a couple of miniature iterations and changing the thickness of the KERF i came to the conclusion that i needed to use a 0.400mm width to make the pieces fit together seamlessly

![Couple of iterations](Insert Image)
