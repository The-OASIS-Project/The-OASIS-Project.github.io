# S.P.A.R.K. - Sensor-based Positioning and Actuation Repulsor Kinetics (Embedded Hand Firmware)

<img src="/assets/SPARK_Logo_bg.png" alt="SPARK Logo" width="350" align="right">

This code is a healthy mix of example code from various libraries with a special thanks to Adafruit for their awesome hardware and software.

**Note:** I will have a circuit diagram in the future. This is a pretty simple one though. All of the devices are I2C devices that can be daisy-chained and it's powered by USB.

## Hardware

* [Adafruit QT Py ESP32-S3](https://www.adafruit.com/product/5426)
* [Adafruit LSM6DSO32](https://www.adafruit.com/product/4692)
* [NeoPixel Jewel - 7 x 5050 RGB LED](https://www.adafruit.com/product/2226)
* [NeoPixel Ring - 12 x 5050 RGB LED](https://www.adafruit.com/product/1643)

## Libraries

- [ArduinoMqttClient](https://github.com/arduino-libraries/ArduinoMqttClient)
- [WiFi](https://github.com/arduino-libraries/WiFi)
- [Adafruit LSM6DSO32](https://github.com/adafruit/Adafruit_LSM6DS)
- [ArduinoJson](https://github.com/bblanchon/ArduinoJson)
- [FastLED](https://github.com/FastLED/FastLED)

## Building

This firmware is currently being built in the Arduino IDE using the libraries and target hardware mentioned above.
