import Adafruit_DHT
import RPi.GPIO as GPIO
import time

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
        # self.on_time = 1/sampling_frequency
        # self.off_time = 1/sampling_frequency
        # self.sensor_state = "LOW"
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
        
        #if self.sensor_state == "LOW" and delta > self.off_time:
            #self._sensor_state = "HIGH"
            #self._tsLastStateChange = time.time()
        #elif self.sensor_state == "HIGH" and delta > self.on_time:
            #self.sensor_state = "LOW"
            #self._tsLastStateChange = time.time()
            #self.read()

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
        
        button_current_state = GPIO.input(microcontroller_pin_button)
        
        if button_current_state == 0:
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
        humidity, temperature = Adafruit_DHT.read(Adafruit_DHT.DHT11, microcontroller_pin)
        
        if humidity is not None and temperature is not None:
            self._humidity = humidity
            self._temperature = temperature

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
        
        if action == "on":
            GPIO.output(microcontroller_pin_led, True)
        else:
            GPIO.output(microcontroller_pin_led, False)

def get_gpio_pin(name):
    index_of_start_digit = re.search(r"\d", name[0]).start()
    gpio_pin = int(name[0][index_of_start_digit:])
    return gpio_pin