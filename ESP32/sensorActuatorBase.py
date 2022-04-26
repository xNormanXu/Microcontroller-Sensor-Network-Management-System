import dht
import time
from machine import Pin

# SensorActuatorBase class
class SensorActuatorBase:
    def __init__(self, name_type, microcontroller_pins):
        self.name_type = name_type
        self.microcontroller_pins = microcontroller_pins

    def configure(self):
        return

    def update(self, action):
        return

## Sensor class
class Sensor(SensorActuatorBase):
    def __init__(self, name_type, sampling_frequency, microcontroller_pins, field_name, data_type):
        super().__init__(name_type, microcontroller_pins)
        self.sampling_frequency = sampling_frequency
        self.field_name = field_name
        self.data_type = data_type
        self.tsLastStateChange = 0

    @property
    def tsLastStateChange(self):
        return self._tsLastStateChange

    @tsLastStateChange.setter
    def tsLastStateChange(self, tsLastStateChange):
        self._tsLastStateChange = tsLastStateChange

    def configure(self):
        return

    def read(self):
        return

    def update(self):
        delta = time.time() - self.tsLastStateChange
        if delta > self.sampling_frequency:
            self._tsLastStateChange = time.time()
            self.read()

## Actuator class
class Actuator(SensorActuatorBase):
    def __init__(self, name_type, microcontroller_pins):
        super().__init__(name_type, microcontroller_pins)

    def configure(self):
        return

    def update(self, action):
        return

### Button class
class Button(Sensor):
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
        GPIO.setmode(GPIO.BCM)
        
        # microcontroller pin to button
        microcontroller_pin_button = int(self.microcontroller_pins[0][5:])
        
        # button to microcontroller pin
        GPIO.setup(microcontroller_pin_button, GPIO.IN, pull_up_down=GPIO.PUD_UP)

    def read(self):
        # microcontroller pin to button
        microcontroller_pin_button = int(self.microcontroller_pins[0][5:])
        # create Button object from microcontroller_pin_button
        button = Pin(microcontroller_pin_button, Pin.IN, Pin.PULL_UP)
        
        # button is pressed
        if button.value() == 0:
            self._pressed = 1
        else:
            self._pressed = 0

### Temperature_Humidity class
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
    # do nothing since DHT library handles configuration
    pass

  def read(self):
    # microcontroller pin
    microcontroller_pin = int(self.microcontroller_pins[0][5:])
    
    dht11 = dht.DHT11(Pin(microcontroller_pin))
    dht11.measure()
    
    self._humidity = dht11.humidity()
    self._temperature = dht11.temperature()

## LED class
class LED(Actuator):
    def __init__(self, name_type, microcontroller_pins):
        super().__init__(name_type, microcontroller_pins)
        
    def configure(self):
        GPIO.setmode(GPIO.BCM)

        # microcontroller pin to led
        microcontroller_pin_led = int(self.microcontroller_pins[0][5:])

        # led to microcontroller pin
        GPIO.setup(microcontroller_pin_led, GPIO.OUT)

        GPIO.output(microcontroller_pin_led, False)

    def update(self, action):
        # microcontroller pin to led
        microcontroller_pin_led = int(self.microcontroller_pins[0][5:])
        # create LED object from microcontroller_pin_led
        led = Pin(microcontroller_pin_led, Pin.OUT)
        
        if action == "on":
            led.value(1)
        else:
            led.value(0)