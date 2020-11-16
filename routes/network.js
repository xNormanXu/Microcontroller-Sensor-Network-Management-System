var express = require('express');
var router = express.Router();
var db =  require('./database');

router.get('/', function(req, res) {
  res.redirect("/network/home");
});
  
router.get('/home', function(req, res, next) {
  db.getAllNetworks(result => {
    console.log(JSON.stringify(result));
    res.render('network_home', { title: 'NETWORK HOME', networks: result });
  }, (err) =>{
    res.send("Network home json error while fetching network information: "+ JSON.stringify(err));
  });
});

router.get('/add', function(req, res, next) {
  db.getAllMicrocontrollers(null, microcontrollers => {
    var network_sensors = req.cookies["network_sensors"];
    console.log(JSON.stringify(network_sensors));
    res.render('network_add', { title: 'ADD NETWORK', microcontrollers: microcontrollers, network_sensors: JSON.stringify(network_sensors) });
  }, (er) => {
    res.send("Network add json error while fetching microcontroller information: " + JSON.stringify(er));
  });
});

router.get('/add/edit', function(req, res, next) {
  db.getEspByMac(req.query.mac_address, microcontroller => {
    db.getAllSensorNames(sensors => {
      db.getConfigurationByEspId(req.query.mac_address, 0, configuration => {
        res.render('network_add_edit', { title: 'EDIT SENSOR IN MICROCONTROLLER', microcontroller: microcontroller, sensors: sensors, configuration: configuration });
      }, (e) => {
        res.send("Network add json error while fetching configuration: " + JSON.stringify(e));
      });
    }, (er) => {
      res.send("Network add json error while fetching sensor names: " + JSON.stringify(er));
    });
  }, (err) => {
    res.send("Network add json error while fetching microcontroller information: " + JSON.stringify(err));
  });
});

router.get('/add/view', function(req, res, next) {
  db.getEspByMac(req.query.mac_address, microcontroller => {
    db.getAllSensorNames(sensors => {
      db.getConfigurationByEspId(req.query.mac_address, 0, configuration => {
        res.render('network_add_view', { title: 'VIEW SENSOR IN MICROCONTROLLER', microcontroller: microcontroller, sensors: sensors, configuration: configuration });
      }, (e) => {
        res.send("Network add json error while fetching configuration: " + JSON.stringify(e));
      });
    }, (er) => {
      res.send("Network add json error while fetching sensor names: " + JSON.stringify(er));
    });
  }, (err) => {
    res.send("Network add json error while fetching microcontroller information: " + JSON.stringify(err));
  });
});

router.get('/modify', function(req, res, next) {
  db.getNetworkByName(req.query.name, result => {
    db.getAllMicrocontrollers(null, microcontrollers => {
      var network_sensors = req.cookies["network_sensors"];
      res.render('network_modify', { title: 'EDIT NETWORK', network: result, microcontrollers: microcontrollers, network_sensors: JSON.stringify(network_sensors) });
    }, (e) => {
      res.send("Network modify json error while fetching microcontroller information: " + JSON.stringify(e));
    });
  }, (er) => {
    res.send("Network modify json error while fetching network information: " + JSON.stringify(er));
  });
});

router.get('/modify/edit', function(req, res, next) {
  db.getEspByMac(req.query.mac, microcontroller => {
    db.getAllSensorNames(sensors => {
      db.getConfigurationByEspId(req.query.mac, 0, configuration => {
        res.render('network_modify_edit', { title: 'EDIT SENSOR IN MICROCONTROLLER', network_name: req.query.network_name, microcontroller: microcontroller, sensors: sensors, configuration: configuration });
      }, (e) => {
        res.send("Network add json error while fetching configuration: " + JSON.stringify(e));
      });
    }, (er) => {
      res.send("Network add json error while fetching sensor names: " + JSON.stringify(er));
    });
  }, (err) => {
    res.send("Network add json error while fetching microcontroller information: " + JSON.stringify(err));
  });
});

router.get('/modify/view', function(req, res, next) {
  db.getEspByMac(req.query.mac, microcontroller => {
    db.getAllSensorNames(sensors => {
      db.getConfigurationByEspId(req.query.mac, 0, configuration => {
        res.render('network_modify_view', { title: 'VIEW SENSOR IN MICROCONTROLLER', network_name: req.query.network_name, microcontroller: microcontroller, sensors: sensors, configuration: configuration });
      }, (e) => {
        res.send("Network add json error while fetching configuration: " + JSON.stringify(e));
      });
    }, (er) => {
      res.send("Network add json error while fetching sensor names: " + JSON.stringify(er));
    });
  }, (err) => {
    res.send("Network add json error while fetching microcontroller information: " + JSON.stringify(err));
  });
});

router.get('/viewNetwork', function(req, res, next) {
  db.getNetworkByName(req.query.name, result => {
    db.getAllMicrocontrollers(null, microcontrollers => {
      var network_sensors = req.cookies["network_sensors"];
      res.render('network_viewNetwork', { title: 'VIEW NETWORK', network: result, microcontrollers: microcontrollers, network_sensors: JSON.stringify(network_sensors) });
    }, (e) => {
      res.send("Network modify json error while fetching microcontroller information: " + JSON.stringify(e));
    });
  }, (er) => {
    res.send("Network modify json error while fetching network information: " + JSON.stringify(er));
  });
});

router.get('/viewNetwork/edit', function(req, res, next) {
  db.getEspByMac(req.query.mac, microcontroller => {
    db.getAllSensorNames(sensors => {
      db.getConfigurationByEspId(req.query.mac, 0, configuration => {
        res.render('network_modify_edit', { title: 'EDIT SENSOR IN MICROCONTROLLER', network_name: req.query.network_name, microcontroller: microcontroller, sensors: sensors, configuration: configuration });
      }, (e) => {
        res.send("Network add json error while fetching configuration: " + JSON.stringify(e));
      });
    }, (er) => {
      res.send("Network add json error while fetching sensor names: " + JSON.stringify(er));
    });
  }, (err) => {
    res.send("Network add json error while fetching microcontroller information: " + JSON.stringify(err));
  });
});

router.get('/viewNetwork/view', function(req, res, next) {
  db.getEspByMac(req.query.mac, microcontroller => {
    db.getAllSensorNames(sensors => {
      db.getConfigurationByEspId(req.query.mac, 0, configuration => {
        res.render('network_modify_view', { title: 'VIEW SENSOR IN MICROCONTROLLER', network_name: req.query.network_name, microcontroller: microcontroller, sensors: sensors, configuration: configuration });
      }, (e) => {
        res.send("Network add json error while fetching configuration: " + JSON.stringify(e));
      });
    }, (er) => {
      res.send("Network add json error while fetching sensor names: " + JSON.stringify(er));
    });
  }, (err) => {
    res.send("Network add json error while fetching microcontroller information: " + JSON.stringify(err));
  });
});

router.get('/viewSensor', function(req, res, next) {
  db.getNetworkByName(req.query.name, result => {
    res.render('network_viewSensor', { title: 'VIEW SENSOR', sensor_name_type: result.sensor_name_type });
  }, (er) => {
    res.send("Network modify json error while fetching network information: " + JSON.stringify(er));
  });
});

module.exports = router;