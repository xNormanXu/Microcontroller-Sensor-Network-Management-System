$(function () {
  localStorage.removeItem("network_microcontrollers");
});

function deleteNetwork(e) {
  let name= $(e).data("name");
  var del = confirm("Are you sure you want to delete this network [Name: " + name + " ]?");
    
  if(del) {
    var durl = 'http://'+window.location.hostname+':3001/api/network/delete/' + name;
    $.get( durl,
      function (data) {
        window.open("../../../network","_self");
        alert("Deleted " + name);
    });  
  }
};