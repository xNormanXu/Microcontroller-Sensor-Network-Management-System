/*
router.get("/microcontroller/delete",function(req,res){
  let del = { };
  if(req.query.id){
    del = {_id: req.query.id};
  }else if(req.query.mac){
    del = {mac :req.query.mac};
  }else{
    res.json({error:
      { message:
        "id or mac needed as query string parameter"}
      });
  }
  db.removeEspWithMac(del,
    result=>{
      res.json(result);
    },
    err=>{
      console.log(err);
      res.send("DELETE SENSOR API Error: "+err);
    });
});

*/