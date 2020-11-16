function deleteSensor(e) {
  let modelType= $(e).data("modeltype");
  var del = confirm("Are you sure you want to delete this sensor [Model type: " + modelType + " ]?");
    
  if(del) {
    var durl = 'http://'+window.location.hostname+':3001/api/sensor/delete/' + modelType;
    $.get( durl,
      function (data) {
        window.open("../../../sensor","_self");
        alert("Deleted "+modelType+" sensor.");
    });  
  }
};