var express = require('express');
var db = require('./database');
var router = express.Router();
const wsserver = require('./wsserver');
const url = require('url');
//const { delete } = require('./network');

/* get api base url */

router.get('/', function(req, res, next) {
  var query = req.query;
  console.log(JSON.stringify(req.headers));
  res.json({ message:'GET request : >> ' + Object.keys(query), url: JSON.stringify(query) });
});

// use this to try test out new apis
router.get('/temp', function(req,res) {

 /* // nested API calls ref code
  db.getSensorCount( sensors =>{
    db.getEspCount( result =>{
      result.sensors = sensors.sensors;
      res.json(result);
    },
    er =>{
      res.send("Temp API ESP Error: "+er);
    });
  },err=>{
    console.warn(err);
    res.send("Temp API Sensor Error: "+err);
  }); */

  console.log(req.query.page+" "+req.query.size);
  db.getAllEspsPagewise(parseInt(req.query.page),parseInt(req.query.size),result =>{
    res.json(result);
  },err=>{
    res.send("Temp API ESP Error: "+err);
  });
});

/* post api base url */

router.post('/', function(req, res, next) {
  res.json({ message:'POST req: ' + JSON.stringify(req.body) });
});

/* 
  Home dashboard: microcontroller and sensor count 

  Microcontroller     
  - 0 : Unconfigured
  - 1 : Configured

  Sensor              
  - 0 : Actuator
  - 1 : Sensor
*/
router.get('/dashboard_info', function(req,res) {
  db.getSensorCount(sensors => {
    db.getEspCount(result => {
      result.sensors = sensors.sensors;
      res.json(result);
    }, (er) => {
      res.send("Dashboard api microcontroller error: " + er);
    });
  }, (err) => {
    console.warn(err);
    res.send("Dashboard api sensor error: " + err);
  });
});

/* sensor */

router.get('/sensor', function(req,res) {
  /*  
    0 - sort by name ascending
    1 - sort by name descending
    2 - sort by model_type ascending
    3 - sort by model_type descending
  */
  let sort = 0;
  if (req.query.sort && Number.isInteger(Number.parseInt(req.query.sort))) {
    sort = req.query.sort % 4;
  }

  db.getAllSensors(sort, result => {
    console.log("Get all sensors successfully: " + JSON.stringify(result));
    res.json({ sensors: result });
  }, (err) => {
    console.warn(err);
    res.send("Get sensor api error: " + err);
  });
});

router.post('/sensor/add', function(req,res) {
  console.log("Added sensor information: " + JSON.stringify(req.body));

  if (req.body.num_of_pins === "1") {
    let pin_label = req.body.pin_label;

    req.body.pin_label = [];
    req.body.pin_label.push(pin_label);
  }

  if (req.body.num_of_fields === "1") {
    let field = req.body.field;
    let data_type = req.body.data_type;

    req.body.field = [];
    req.body.data_type = [];

    req.body.field.push(field);
    req.body.data_type.push(data_type);
  }
  
  db.addNewSensor(req.body, result => {
    console.log("Add new sensor successfully: " + JSON.stringify(result));
    res.location("../../sensor");
    res.redirect("../../sensor");
  }, (err) => {
    console.warn(err);
    res.send("Add sensor api error: " + err);
  });
});

// NOTE: USE ADD API it does the task of UPDATE too a.k.a. : UPSERT 
router.post('/sensor/modify',function(req,res){
  console.log(JSON.stringify(req.body));
  db.updateSensorWithType(req.body.model_type,req.body,(result)=>{
    res.json(result);
  },(err)=>{
    console.warn(err);
    res.send("UPDATE SENSOR API Error: "+err);
  })
});

router.get("/sensor/delete/:id",function(req,res){
  db.removeSensorByType(req.params.id, result => {
    res.json(result);
  }, (err) => {
    console.warn(err);
    res.send("Delete sensor api error: " + err);
  });
});

/* microcontroller */

router.get('/microcontroller', function(req,res) {
  /* 
    Note: filter by Status 
    0 - Unconfigured
    1 - Configured
    2 - OTA [not in use] 
  */
  let filter = null;
  if (req.query.filter && Number.isInteger(Number.parseInt(req.query.filter))) {
    filter = req.query.filter;
  }

  console.log("req.query.filter " + req.query.filter);

  db.getAllMicrocontrollers(filter, result => {
    console.log("Get all microcontrollers successfully: " + JSON.stringify(result));
    res.json({ microcontrollers: result });
  }, (err) => {
    console.log(err);
    res.send("Get microcontroller api error: " + err);
  });
});

router.post('/microcontroller/add', function(req,res) {
  console.log("Added microcontroller information: " + JSON.stringify(req.body));

  // modify req body
  if (req.body.num_of_pins === "1") {
    let pin_label = req.body.pin_label;
    let pin_num = req.body.pin_num;

    req.body.pin_label = [];
    req.body.pin_num = [];

    req.body.pin_label.push(pin_label);
    req.body.pin_num.push(pin_num);
  }

  req.body.pins = [];
  
  for (var i = 0; i < req.body.num_of_pins; i++) {
    let pin = {
      "pin_label": req.body.pin_label[i],
      "pin_num": req.body.pin_num[i]
    }
    req.body.pins.push(pin);
  }

  delete req.body.pin_num;
  console.log("\nThis is final added microcontroller req body: " + JSON.stringify(req.body));

  db.upsertEsp(req.body, result => {
    console.log("\nUpsert microcontroller successfully: " + JSON.stringify(result));
    res.location("../../microcontroller");
    res.redirect("../../microcontroller");
  }, (err) =>{
    console.log(err);
    res.send("Add microcontroller api error: " + err);
  });
});

router.post('/microcontroller/modify', function(req,res) {
  console.log("\nModify microcontroller json: " + JSON.stringify(req.body));

  db.upsertEsp(req.body, result => {
    res.json(result);
  }, (err) => {
    console.log(err);
    res.send("Update microcontroller api error: " + err);
  });
});

router.get("/microcontroller/delete/:mac",function(req,res){
  db.removeEspWithMac({mac:req.params.mac},
    result=>{
      res.json(result);
    },
    err=>{
      console.warn(err);
      res.send("DELETE ESP API Error: "+err);
    });
});

router.get("/microcontroller/push_ota",function(req,res){
  let mac = req.query.mac;
  wsserver.triggerEspEvent(mac,12);
  res.send({status:200});
});

/* IoT Network */

router.post('/network/add', function(req,res) {
  console.log("Added network information: " + JSON.stringify(req.body));
  req.body = JSON.parse(JSON.stringify(req.body));

  // microcontrollers
  req.body.microcontrollers = [];

  // there exists microcontrollers in network
  if (req.body.hasOwnProperty("microcontroller_name_type")) {
    // only one microcontroller in network
    if (typeof req.body.microcontroller_name_type === 'string') {
      let microcontroller_name_type = req.body.microcontroller_name_type;
      req.body.microcontroller_name_type = [];
      req.body.microcontroller_name_type.push(microcontroller_name_type);

      let mac_address = req.body.mac_address;
      req.body.mac_address = [];
      req.body.mac_address.push(mac_address);

      let microcontroller_location = req.body.microcontroller_location;
      req.body.microcontroller_location = [];
      req.body.microcontroller_location.push(microcontroller_location);

      let num_of_sensors = req.body.num_of_sensors;
      req.body.num_of_sensors = [];
      req.body.num_of_sensors.push(num_of_sensors);
    }

    if (typeof req.body.sensor_name_type === 'string') {
      let sensor_name_type = req.body.sensor_name_type;
      req.body.sensor_name_type = [];
      req.body.sensor_name_type.push(sensor_name_type);

      let sensor_location = req.body.sensor_location;
      req.body.sensor_location = [];
      req.body.sensor_location.push(sensor_location);

      let sampling_frequency = req.body.sampling_frequency;
      req.body.sampling_frequency = [];
      req.body.sampling_frequency.push(sampling_frequency);

      let num_of_pins = req.body.num_of_pins;
      req.body.num_of_pins = [];
      req.body.num_of_pins.push(num_of_pins);

      let microcontroller_pin = req.body.microcontroller_pin;
      req.body.microcontroller_pin = [];
      req.body.microcontroller_pin.push(microcontroller_pin);

      let sensor_pin = req.body.sensor_pin;
      req.body.sensor_pin = [];
      req.body.sensor_pin.push(sensor_pin);
    }

    for (var i = 0; i < req.body.mac_address.length; i++) {
      let microcontroller = {
        "microcontroller_name": req.body.microcontroller_name_type[i].substring(0, req.body.microcontroller_name_type[i].indexOf('(') - 1),
        "microcontroller_type": req.body.microcontroller_name_type[i].substring(req.body.microcontroller_name_type[i].indexOf('(') + 1, req.body.microcontroller_name_type[i].indexOf(')')),
        "mac_address": req.body.mac_address[i],
        "microcontroller_location": req.body.microcontroller_location[i]
      }
      req.body.microcontrollers.push(microcontroller);

      // sensors
      req.body.microcontrollers[i].sensors = [];

      var sensor_name_type = req.body.sensor_name_type[i].split(",");
      var sensor_location = req.body.sensor_location[i].split(",");
      var sampling_frequency = req.body.sampling_frequency[i].split(",");
      var num_of_pins = req.body.num_of_pins[i].split(",");
      var microcontroller_pin = req.body.microcontroller_pin[i].split(",");
      var sensor_pin = req.body.sensor_pin[i].split(",");

      var m = 0;

      for (var j = 0; j < req.body.num_of_sensors[i]; j++) {
        let sensor = {
          "sensor_name": sensor_name_type[j].substring(0, sensor_name_type[j].indexOf('(') - 1),
          "sensor_type": sensor_name_type[j].substring(sensor_name_type[j].indexOf('(') + 1, sensor_name_type[j].indexOf(')')),
          "sensor_location": sensor_location[j],
          "sampling_frequency": sampling_frequency[j]
        }

        sensor.pins = [];
        for (var k = 0; k < num_of_pins[j]; k++) {
          let pins = {
            "microcontroller_pin": microcontroller_pin[m],
            "sensor_pin": sensor_pin[m]
          }

          sensor.pins.push(pins);
          m++;
        }

        req.body.microcontrollers[i].sensors.push(sensor);
      }
    }
  }

  delete req.body.selected_microcontroller;
  delete req.body.microcontroller_name;
  delete req.body.microcontroller_type;
  delete req.body.mac_address;
  delete req.body.microcontroller_location;
  delete req.body.num_of_sensors;

  delete req.body.sensor_location;
  delete req.body.sampling_frequency;

  delete req.body.num_of_pins;
  delete req.body.microcontroller_pin;
  delete req.body.sensor_pin;

  delete req.body.network_sensors;
    
  console.log("\nThis is final network req body: " + JSON.stringify(req.body));
  
  db.upsertNetwork(req.body, result => {
    //wsserver.triggerEspEvent(req.body.mac, 8);
    console.log("Upsert network successfully: " + JSON.stringify(result));
    res.location("../../network");
    res.redirect("../../network");
  }, (err) => {
    console.log(err);
  });
});

router.post('/network/modify', function(req, res) {
  console.log("\nModify network json: " + JSON.stringify(req.body));

  db.upsertNetwork(req.body, result => {
    res.json(result);
  }, (err) => {
    console.log(err);
    res.send("Update network api error: " + err);
  });
});

router.get("/network/delete/:id", function(req, res){
  db.removeNetworkByName(req.params.id, result => {
    res.json(result);
  }, (err) => {
    console.warn(err);
    res.send("Delete network api error: " + err);
  });
});

router.post('/network/add/edit', function(req, res) {
  console.log("\nThis is inital sensor that will be added into microcontroller: " + JSON.stringify(req.body));

  if (typeof req.body.sensor_name_type === 'string') {
    // sensor name and type
    let sensor_name_type = req.body.sensor_name_type;
    req.body.sensor_name_type = [];
    req.body.sensor_name_type.push(sensor_name_type);

    // sensor location
    let sensor_location = req.body.sensor_location;
    req.body.sensor_location = [];
    req.body.sensor_location.push(sensor_location);

    // sampling frequency
    let sampling_frequency = req.body.sampling_frequency;
    req.body.sampling_frequency = [];
    req.body.sampling_frequency.push(sampling_frequency);
  }

  if (typeof req.body.num_of_pins === 'string') {
    // num of pins
    let num_of_pins = req.body.num_of_pins;
    req.body.num_of_pins = [];
    req.body.num_of_pins.push(num_of_pins);
  }

  if (typeof req.body.num_of_fields === 'string') {
    // num of fields
    let num_of_fields = req.body.num_of_fields;
    req.body.num_of_fields = [];
    req.body.num_of_fields.push(num_of_fields);
  }

  req.body = JSON.parse(JSON.stringify(req.body));

  if (typeof req.body.sensor_pin === 'string') {
    // sensor pin
    let sensor_pin = req.body.sensor_pin;
    req.body.sensor_pin = [];
    req.body.sensor_pin.push(sensor_pin);

    // microcontroller pin
    let microcontroller_pin = req.body.microcontroller_pin;
    req.body.microcontroller_pin = [];
    req.body.microcontroller_pin.push(microcontroller_pin);
  }

  if (typeof req.body.field_name === 'string') {
    // field name
    let field_name = req.body.field_name;
    req.body.field_name = [];
    req.body.field_name.push(field_name);

    // data type
    let data_type = req.body.data_type;
    req.body.data_type = [];
    req.body.data_type.push(data_type);
  }

  // array of sensors
  req.body.sensors = []
  // pointer of pins (sensor pins and microcontroller pins)
  var ptrOfPins = 0;
  // pointer of field name and data type
  var ptrOfField = 0;

  if (!req.body.hasOwnProperty("sensor_name_type")) {
    req.body.sensor_name_type = [];
  }

  for (var i = 0; i < req.body.sensor_name_type.length; i++) {
    let sensor = {};
    sensor.name_type = req.body.sensor_name_type[i];
    sensor.location = req.body.sensor_location[i];
    sensor.sampling_frequency = req.body.sampling_frequency[i];

    sensor.sensor_pins = [];
    sensor.microcontroller_pins = [];

    for (var j = 0; j < req.body.num_of_pins[i]; j++) {
      sensor.sensor_pins.push(req.body.sensor_pin[ptrOfPins]);
      sensor.microcontroller_pins.push(req.body.microcontroller_pin[ptrOfPins]);
      ptrOfPins++;
    }

    sensor.field_name = [];
    sensor.data_type = [];

    for (var j = 0; j < req.body.num_of_fields[i]; j++) {
      sensor.field_name.push(req.body.field_name[ptrOfField]);
      sensor.data_type.push(req.body.data_type[ptrOfField]);
      ptrOfField++;
    }

    req.body.sensors.push(sensor);
  }

  delete req.body.selected_sensor;
  delete req.body.pin_labels;
  delete req.body.configuration;

  delete req.body.sensor_name_type;
  delete req.body.sensor_location;
  delete req.body.sampling_frequency;

  delete req.body.num_of_pins;
  delete req.body.sensor_pin;
  delete req.body.microcontroller_pin;

  delete req.body.num_of_fields;
  delete req.body.field_name;
  delete req.body.data_type;

  console.log("\nThis is final sensor added into microcontroller: " + JSON.stringify(req.body));

  db.upsertConfiguration(req.body, result => {
    console.log("Upsert configuration successfully: " + JSON.stringify(result));
    res.cookie("network_sensors", req.body);
    res.location("../../../network/add");
    res.redirect("../../../network/add");
  }, (err) => {
    console.warn(err);
    res.send("Upsert configuration api error: " + err);
  });

});

router.post('/network/modify/edit', function(req, res) {
  console.log("\nThis is inital sensor that will be added into microcontroller: " + JSON.stringify(req.body));

  if (typeof req.body.sensor_name_type === 'string') {
    // sensor name and type
    let sensor_name_type = req.body.sensor_name_type;
    req.body.sensor_name_type = [];
    req.body.sensor_name_type.push(sensor_name_type);

    // sensor location
    let sensor_location = req.body.sensor_location;
    req.body.sensor_location = [];
    req.body.sensor_location.push(sensor_location);

    // sampling frequency
    let sampling_frequency = req.body.sampling_frequency;
    req.body.sampling_frequency = [];
    req.body.sampling_frequency.push(sampling_frequency);
  }

  if (typeof req.body.num_of_pins === 'string') {
    // num of pins
    let num_of_pins = req.body.num_of_pins;
    req.body.num_of_pins = [];
    req.body.num_of_pins.push(num_of_pins);
  }

  if (typeof req.body.num_of_fields === 'string') {
    // num of fields
    let num_of_fields = req.body.num_of_fields;
    req.body.num_of_fields = [];
    req.body.num_of_fields.push(num_of_fields);
  }

  req.body = JSON.parse(JSON.stringify(req.body));

  if (typeof req.body.sensor_pin === 'string') {
    // sensor pin
    let sensor_pin = req.body.sensor_pin;
    req.body.sensor_pin = [];
    req.body.sensor_pin.push(sensor_pin);

    // microcontroller pin
    let microcontroller_pin = req.body.microcontroller_pin;
    req.body.microcontroller_pin = [];
    req.body.microcontroller_pin.push(microcontroller_pin);
  }

  if (typeof req.body.field_name === 'string') {
    // field name
    let field_name = req.body.field_name;
    req.body.field_name = [];
    req.body.field_name.push(field_name);

    // data type
    let data_type = req.body.data_type;
    req.body.data_type = [];
    req.body.data_type.push(data_type);
  }

  // array of sensors
  req.body.sensors = []
  // pointer of pins (sensor pins and microcontroller pins)
  var ptrOfPins = 0;
  // pointer of field name and data type
  var ptrOfField = 0;

  if (!req.body.hasOwnProperty("sensor_name_type")) {
    req.body.sensor_name_type = [];
  }

  for (var i = 0; i < req.body.sensor_name_type.length; i++) {
    let sensor = {};
    sensor.name_type = req.body.sensor_name_type[i];
    sensor.location = req.body.sensor_location[i];
    sensor.sampling_frequency = req.body.sampling_frequency[i];

    sensor.sensor_pins = [];
    sensor.microcontroller_pins = [];

    for (var j = 0; j < req.body.num_of_pins[i]; j++) {
      sensor.sensor_pins.push(req.body.sensor_pin[ptrOfPins]);
      sensor.microcontroller_pins.push(req.body.microcontroller_pin[ptrOfPins]);
      ptrOfPins++;
    }

    sensor.field_name = [];
    sensor.data_type = [];

    for (var j = 0; j < req.body.num_of_fields[i]; j++) {
      sensor.field_name.push(req.body.field_name[ptrOfField]);
      sensor.data_type.push(req.body.data_type[ptrOfField]);
      ptrOfField++;
    }

    req.body.sensors.push(sensor);
  }

  var network_name = req.body.network_name;
  var mac_address = req.body.mac
  req.body.mac_address = mac_address;

  delete req.body.network_name;
  delete req.body.mac;
  delete req.body.selected_sensor;
  delete req.body.pin_labels;
  delete req.body.configuration;

  delete req.body.sensor_name_type;
  delete req.body.sensor_location;
  delete req.body.sampling_frequency;

  delete req.body.num_of_pins;
  delete req.body.sensor_pin;
  delete req.body.microcontroller_pin;

  delete req.body.num_of_fields;
  delete req.body.field_name;
  delete req.body.data_type;

  console.log("\nThis is final sensor added into microcontroller: " + JSON.stringify(req.body));

  db.upsertConfiguration(req.body, result => {
    console.log("Upsert configuration successfully: " + JSON.stringify(result));
    res.cookie("network_sensors", req.body);
    res.location("../../../network/modify?name=" + network_name);
    res.redirect("../../../network/modify?name=" + network_name);
  }, (err) => {
    console.warn(err);
    res.send("Upsert configuration api error: " + err);
  });

});

// router.post('/network/modify/edit', function(req, res) {
//   delete req.body.selected_sensor;
//   console.log("\nThis is final sensor added into network req body: " + JSON.stringify(req.body));

//   res.cookie("network_sensors", req.body);
//   res.location("../../../network/modify?name=" + req.body.network_name);
//   res.redirect("../../../network/modify?name=" + req.body.network_name);
// });

router.post('/network/modify/view', function(req, res) {
  delete req.body.selected_sensor;
  console.log("\nThis is final sensor added into network req body: " + JSON.stringify(req.body));

  res.cookie("network_sensors", req.body);
  res.location("../../../network/modify?name=" + req.body.network_name);
  res.redirect("../../../network/modify?name=" + req.body.network_name);
});

/* DATA */

router.get('/datafields',function(req,res){
  let mac = req.query.mac;
  db.getEspDataFields(mac,(data)=>{
    res.send(JSON.stringify(data));
  },e=>{
    res.send(JSON.stringify(e));
  });
});

router.post('/data',function(req,res){
  
  console.log("fetch esp sensor DATA POST body: "+JSON.stringify(req.body));
  let pno=parseInt(req.body.page);
  let count = parseInt(req.body.page_size);
  let param =  req.body.parameter;
  let mac = req.body.mac;

  db.getEspDataPagewise(mac,param,pno,count,result =>{
    res.json(result);
  },err=>{
    res.send("Fetch DATA READINGS API ESP Error: "+err);
  });
});


module.exports = router;