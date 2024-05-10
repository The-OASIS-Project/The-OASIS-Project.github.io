# A.U.R.A - Advanced Utility for Reliable Acquisition (Embedded Helmet Firmware)

<img src="/assets/AURA_Logo_bg.png" alt="AURA Logo" width="350" align="right">

This code is a healthy mix of example code from various libraries with a special thanks to Adafruit for their awesome hardware and software.

**Note:** I will have a circuit diagram in the future. This is a pretty simple one though. All of the devices are I2C devices that can be daisy-chained and it's powered by USB.

## Hardware

* [Teensy 4.0](https://www.pjrc.com/store/teensy40.html) - Main Processor
* [Adafruit LSM6SDSOX+LIS3MDL](http://adafru.it/4517) - 9-DOF Sensor
* [Adafruit Mini GPS](http://adafru.it/4415) - GPS
* [Adafruit HTS221 Humidity Sensor](http://adafru.it/4535) - Temperature and Humidity Sensor
* [128x64 OLED Display](http://adafru.it/326) - Optional: This was used to tune the system, especially the motorization that's in progress.

## Libraries

- [SPI](https://github.com/arduino-libraries/SPI)
- [Wire](https://github.com/arduino-libraries/Wire)
- [Adafruit GFX Library](https://github.com/adafruit/Adafruit-GFX-Library)
- [Adafruit SSD1306](https://github.com/adafruit/Adafruit_SSD1306)
- [Adafruit Sensor Calibration](https://github.com/adafruit/Adafruit_Sensor_Calibration)
- [Adafruit GPS Library](https://github.com/adafruit/Adafruit_GPS)
- [Adafruit HTS221](https://github.com/adafruit/Adafruit_HTS221)
- [Servo (for PWMServo)](https://github.com/arduino-libraries/Servo)
- [Bounce2](https://github.com/thomasfredericks/Bounce2)
- [Adafruit Seesaw](https://github.com/adafruit/Adafruit_Seesaw)
- [ArduinoJson](https://github.com/bblanchon/ArduinoJson)
- [Adafruit AHRS](https://github.com/adafruit/Adafruit_AHRS)
- [Adafruit LSM6DS](https://github.com/adafruit/Adafruit_LSM6DS)

## Building

This firmware is currently being built in the Arduino IDE using the libraries and target hardware mentioned above.
