var express = require('express');
var db =  require('./database');
var router = express.Router();

router.get('/', function(req, res) {
  res.redirect(req.query.filter? "/microcontroller/home?filter=" + req.query.filter : "/microcontroller/home");
});

router.get('/home', function(req, res, next) {
  let filter = null;
  // filter by Status 0 - unconfigured ; 1 - Configured ; 2 - OTA available [not used]
  if (req.query.filter && Number.isInteger(Number.parseInt(req.query.filter))) {
    filter = req.query.filter;
  }

  db.getAllMicrocontrollers(filter, result => {
    console.log(JSON.stringify(result));
    res.render('esp_home', { title:'MICROCONTROLLER HOME', esps: result });
  }, (err) =>{
    res.send("Microcontroller home json error while fetching sensor information: "+ JSON.stringify(err));
  });
});

router.get('/add', function(req, res, next) {
  res.render('esp_add', { title:'ADD MICROCONTROLLER' });
});

router.get('/modify', function(req, res, next) {
  // mac address is used as microcontroller id
  let microcontrollerId = req.query.mac;

  db.getEspByMac(microcontrollerId, result => {
    res.render('esp_modify', { title: 'EDIT MICROCONTROLLER', esp: result });
  }, (err) => {
    res.send("Microcontroller modify json error while fetching sensor information: " + JSON.stringify(err));
  });
});

router.get('/view', function(req, res, next) {
  // mac address is used as microcontroller id
  let microcontrollerId = req.query.mac;
  
  db.getEspByMac(microcontrollerId, result => {
    res.render('esp_view', { 
      title: 'VIEW MICROCONTROLLER', 
      esp: result,
      data: { 
        isDataAvailable: true,
        page: 1 ,
        page_size: 10
      }
    });
  }, (err) => {
    res.send("Microcontroller view json error while fetching information: " + JSON.stringify(err));
  });
});

module.exports = router;
