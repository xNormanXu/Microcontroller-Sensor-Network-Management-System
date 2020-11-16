import json
import network
import time
import ubinascii
import uheapq
from umqttsimple import MQTTClient
from machine import Pin
from sensor import Sensor
from sensor import Button_LED
from sensor import Temperature_Humidity

SSID = "getyourownwifi"
PASSWORD = "1A2S3D4F5g)(*&Via"
MQTT_HOST = "10.0.0.233"
MQTT_PORT = 3001
MQTT_CONTROL_CHANNEL = "control"
MQTT_CONFIGURATION_CHANNEL = "configuration"
MQTT_DATA_CHANNEL = "data"

################ MQTT ################

def set_wifi():
  station = network.WLAN(network.STA_IF)
  station.active(True)
  station.connect(SSID, PASSWORD)
  
  while station.isconnected() == False:
    pass
    
  print("Wifi connection is successful!")

def on_message(topic, message):
  if topic == b"configuration":
    print("Receive configuration message : " + str(message))
    print()

    configuration = json.loads(message)
    uheapq.heappush(heap, configuration)

def connect_server(client):
  client.set_callback(on_message)
  client.connect()
  client.subscribe("configuration")
  
################ process configuration ################

def process_configuration():
  configuration = uheapq.heappop(heap)
  
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
  mac = ubinascii.hexlify(network.WLAN().config('mac'),':').decode()
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
  mac = ubinascii.hexlify(network.WLAN().config('mac'),':').decode()
  
  try:
    set_wifi()
    client = MQTTClient("umqtt_client", "10.0.0.233")
    connect_server(client)
    print("-------press ctrl-c to stop the polling")

    # create and publish control message
    control_message = {"mac": mac}
    client.publish(MQTT_CONTROL_CHANNEL, json.dumps(control_message))
    print("Publish control message : " + str(control_message))
    print()
    
    time.sleep(5)
    
    client.check_msg()
    # process configuration
    sensors = process_configuration()
    
    while True:
      
      for sensor in sensors:
        publish_data_message(client, sensor)

  # catches the ctrl-c command, which breaks the loop above
  except KeyboardInterrupt:
    print("Continuous polling stopped")

  finally:
    client.disconnect()

heap = []
start_process()

