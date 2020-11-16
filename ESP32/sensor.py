import dht
import time
from machine import Pin


class Sensor:
  def __init__(self, name_type, sampling_frequency, microcontroller_pins, field_name, data_type):
    self.name_type = name_type
    self.sampling_frequency = sampling_frequency
    self.microcontroller_pins = microcontroller_pins
    self.field_name = field_name
    self.data_type = data_type
    self.on_time = 1/sampling_frequency
    self.off_time = 1/sampling_frequency
    self.sensor_state = "LOW"
    self.tsLastStateChange = 0

  @property
  def sensor_state(self):
    return self._sensor_state

  @sensor_state.setter
  def sensor_state(self, sensor_state):
    self._sensor_state = sensor_state

  @property
  def tsLastStateChange(self):
    return self._tsLastStateChange

  @tsLastStateChange.setter
  def tsLastStateChange(self, tsLastStateChange):
    self._tsLastStateChange = tsLastStateChange

  def configure(self):
    print("Start configuring!")

  def read(self):
    print("Start reading!")

  def update(self):
    delta = time.time() - self.tsLastStateChange
    if self.sensor_state == "LOW" and delta > self.off_time:
      self._sensor_state = "HIGH"
      self._tsLastStateChange = time.time()
    elif self.sensor_state == "HIGH" and delta > self.on_time:
      self._sensor_state = "LOW"
      self._tsLastStateChange = time.time()
      self.read()


class Accelerometer(Sensor):
  def __init__(self, name_type, sampling_frequency, microcontroller_pins, field_name, data_type):
    super().__init__(name_type, sampling_frequency, microcontroller_pins, field_name, data_type)
    self.x = 0
    self.y = 0
    self.z = 0

  @property
  def x(self):
    return self._x

  @x.setter
  def x(self, x):
    self._x = x

  @property
  def y(self):
    return self._y

  @y.setter
  def y(self, y):
    self._y = y

  @property
  def z(self):
    return self._z

  @z.setter
  def z(self, z):
    self._z = z

  @property
  def attributes(self):
    return [self.x, self.y, self.z]

  def configure(self):
    pass

  def read(self):
    pass

class Button_LED(Sensor):
  def __init__(self, name_type, sampling_frequency, microcontroller_pins, field_name, data_type):
    super().__init__(name_type, sampling_frequency, microcontroller_pins, field_name, data_type)
    self.pressed = 0

  @property
  def pressed(self):
    return self._pressed

  @pressed.setter
  def pressed(self, pressed):
    self._pressed = pressed

  @property
  def attributes(self):
    return [self.pressed]

  def configure(self):
    pass

  def read(self):
    # microcontroller pin to button
    microcontroller_pin_button = int(self.microcontroller_pins[0][5:])
    # microcontroller pin to led
    microcontroller_pin_led = int(self.microcontroller_pins[1][5:])

    # create Button object from microcontroller_pin_button
    button = Pin(microcontroller_pin_button, Pin.IN, Pin.PULL_UP)
    # create LED object from microcontroller_pin_led
    led = Pin(microcontroller_pin_led, Pin.OUT)
    
    # button is pressed
    if button.value() == 0:
      led.value(1)
      self._pressed = 1
    else:
      led.value(0)
      self._pressed = 0

class Ph(Sensor):
  def __init__(self, name_type, sampling_frequency, microcontroller_pins, field_name, data_type):
    super().__init__(name_type, sampling_frequency, microcontroller_pins, field_name, data_type)
    self.ph = 0

  @property
  def ph(self):
    return self._ph

  @ph.setter
  def ph(self, ph):
    self._ph = ph

  @property
  def attributes(self):
    return [self.ph]

  def configure(self):
    pass

  def read(self):
    pass

class Temperature_Humidity(Sensor):
  def __init__(self, name_type, sampling_frequency, microcontroller_pins, field_name, data_type):
    super().__init__(name_type, sampling_frequency, microcontroller_pins, field_name, data_type)
    self.temperature = 0
    self.humidity = 0
      
  @property
  def temperature(self):
    return self._temperature

  @temperature.setter
  def temperature(self, temperature):
    self._temperature = temperature

  @property
  def humidity(self):
    return self._humidity

  @humidity.setter
  def humidity(self, humidity):
    self._humidity = humidity/100

  @property
  def attributes(self):
    return [self.temperature, self.humidity]

  def configure(self):
    pass

  def read(self):
    # microcontroller pin
    microcontroller_pin = int(self.microcontroller_pins[0][5:])
    
    dht11 = dht.DHT11(Pin(microcontroller_pin))
    dht11.measure()
    
    self._humidity = dht11.humidity()
    self._temperature = dht11.temperature()





