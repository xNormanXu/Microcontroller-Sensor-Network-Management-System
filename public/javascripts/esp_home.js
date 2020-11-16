function deleteMicrocontroller(e) {
  let mac= $(e).data("mac");
  var del = confirm("Are you sure you want to delete this microcontroller [MAC: " + mac + " ]? Its configuration will also be deleted!");
    
  if (del) {
    var durl = 'http://' + window.location.hostname + ':3001/api/microcontroller/delete/' + mac;
    $.get(durl, function (data) {
      window.open("../../../microcontroller", "_self");
      alert("Microcontroller [MAC: " + mac + " ] has been deleted.");
    });  
  }
};