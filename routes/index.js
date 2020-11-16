var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title :'DASHBOARD' , 
    head_title: 'Distributed Sensor Network Mangement Solution for Arduino-based Microcontrollers' 
  });
});

module.exports = router;
