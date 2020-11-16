import json
import queue
import time
import types
import Adafruit_DHT
import RPi.GPIO as GPIO
import paho.mqtt.client as mqtt
from multiprocessing import Process
from getmac import get_mac_address
from sensor import Sensor
from sensor import Button_LED
from sensor import Temperature_Humidity

MQTT_HOST = "10.0.0.233"
MQTT_PORT = 3001
MQTT_CONTROL_CHANNEL = "control"
MQTT_CONFIGURATION_CHANNEL = "configuration"
MQTT_DATA_CHANNEL = "data"

################ MQTT ################

def on_connect(client, userdata, flags, rc):
    client.subscribe(MQTT_CONFIGURATION_CHANNEL)
    client.subscribe(MQTT_DATA_CHANNEL)

def on_message(client, userdata, message):
    if message.topic == MQTT_CONFIGURATION_CHANNEL:
        print("Receive configuration message : " + str(message.payload))
        print()

    configuration = json.loads(message.payload)
    q.put(configuration)

def connect_server(client):
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect(MQTT_HOST)
    client.loop_start()

################ process configuration ################

def process_configuration():
    configuration = q.get()
    sensors = []

    for item in configuration["sensors"]:
        # string
        name_type = item["name_type"]
        # integer
        sampling_frequency = int(item["sampling_frequency"])
        # array
        microcontroller_pins = item["microcontroller_pins"]
        # array
        field_name = item["field_name"]
        # array
        data_type = item["data_type"]

        # sensor type
        sensor_type = name_type[name_type.index("(") + 1:name_type.rindex(")")]

        if sensor_type == "BUTTON":
            sensor = Button_LED(name_type, sampling_frequency, microcontroller_pins, field_name, data_type)
            sensors.append(sensor)

        if sensor_type == "DHT11":
            sensor = Temperature_Humidity(name_type, sampling_frequency, microcontroller_pins, field_name, data_type)
            sensors.append(sensor)

        if sensor_type == "ACCELEROMETER":
            sensor = Accelerometer(name_type, sampling_frequency, microcontroller_pins, field_name, data_type)
            sensors.append(sensor)

        if sensor_type == "PH":
            sensor = Ph(name_type, sampling_frequency, microcontroller_pins, field_name, data_type)
            sensors.append(sensor)

    return sensors

################ publish data message ################

def publish_data_message(client, sensor):
    # mac
    mac = get_mac_address()
    # measurement
    measurement = sensor.name_type[:sensor.name_type.index(" ")]
    # tags
    tags = {"mac": mac}
    # fields
    fields = {}

    for i in range(0, len(sensor.field_name)):
        fieldName = sensor.field_name[i].lower()
        dataType = sensor.data_type[i]

        fields[fieldName] = sensor.attributes[i]
        fields[fieldName + "_data_type"] = dataType

    sensor.update()
    for i in range(0, len(sensor.field_name)):
        fieldName = sensor.field_name[i].lower()
        fields[fieldName] = sensor.attributes[i]
        
        # create and publish data message
        data_message = {"mac": mac, "measurement": measurement, "tags": tags, "fields": fields}
        client.publish(MQTT_DATA_CHANNEL, json.dumps(data_message))
        print("Publish data message : " + str(data_message))

################ start process ################

def start_process():
    mac = get_mac_address()
    
    try:
        client = mqtt.Client()
        connect_server(client)
        print("-------press ctrl-c to stop the polling")

        time.sleep(2)

        # create and publish control message
        control_message = {"mac": mac}
        client.publish(MQTT_CONTROL_CHANNEL, json.dumps(control_message))
        print("Publish control message : " + str(control_message))
        print()

        # process configuration
        sensors = process_configuration()

        for sensor in sensors:
            sensor.configure()

        while True:
            for sensor in sensors:
                publish_data_message(client, sensor)
                
    # catches the ctrl-c command, which breaks the loop above
    except KeyboardInterrupt:
        print("Continuous polling stopped")

    finally:
        GPIO.cleanup()

################ main function ################

q = queue.Queue()
start_process()
