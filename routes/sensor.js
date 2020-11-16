var express = require('express');
var router = express.Router();
var db =  require('./database');

router.get('/', function(req, res) {
  res.redirect((req.query.sort)?"/sensor/home?sort="+req.query.sort:"/sensor/home");
});

router.get('/home', function(req, res, next) {
  let sort=0;
  /*
    0 sort by name ascending ; 
    1 sort by name desc ; 
    2 sort by model_type asc ; 
    3 sort by model_type desc 
    4 category + name asc 
  */
  if(req.query.sort && Number.isInteger(Number.parseInt(req.query.sort))){
    sort = req.query.sort % 5;
  }

  db.getAllSensors(sort,result=>{
    res.render('sensor_home',{title:'SENSOR HOME', sensors : result})
  },err=>{
    res.send("SENSOR HOME JS ERROR while fetching Sensor info :"+ JSON.stringify(err))
  });

});

router.get('/add', function(req, res, next) {
  res.render('sensor_add',{title:'ADD SENSOR'});
});

router.get('/modify', function(req, res, next) {
  db.getSensorById(req.query.id,
    result=>{
      res.render('sensor_modify',{title:'EDIT SENSOR', sensor : result });
    },
    err=>{
      res.send("SENSOR MODIFY JS ERROR while fetching Sensor info :"+ JSON.stringify(err));
    });
  
});

module.exports = router;
