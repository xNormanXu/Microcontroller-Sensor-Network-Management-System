# Microcontroller Sensor Network Management System

## Introduction
The system helps manage microcontroller, sensor and network. Any user can create/edit microcontrollers and sensors and add them into network. When microcontroller correctly connects sensor and starts booting, real data can be viewed on Grafana platform.

## How to use
### Start the server

Navigate to the server folder of the repo and run the following commands

`npm install`

`node app.js`

### Add the microcontroller and sensor into network

Navigate to the home page of the server and click `IoT network` section to create network. Then add microcontroller and sensor into the network.

### Boot the microcontroller

Before booting the microcontroller, make sure wire connection is correct.

#### Boot Raspberry Pi
Set up your Raspberry Pi. You can follow the [instruction](https://www.raspberrypi.org/documentation/setup/) here. After everything is done, you can start run the script to read data from sensor. Navigate to the Raspberry Pi folder and you will see a main.py file. Run `python3 main.py`. Remember: make sure your server is running.

#### Boot ESP32
Set up your ESP32. You can follow the [instruction](https://randomnerdtutorials.com/install-upycraft-ide-windows-pc-instructions/). In this project, we choose `uPyCraft` as MicroPython IDE. After successful installation, flash and upload MicroPython firmware to ESP32 following this [instruction](https://randomnerdtutorials.com/flash-upload-micropython-firmware-esp32-esp8266/). Now you can run the program. To make script file work. remember to download and run all the files(**the order is umqttsimple.py -> sensor.py -> main.py**) in ESP32 folder in this project. 

### Start Grafana
