
$(function () {
  
  $.getJSON( "../api/dashboard_info", function( data ) {
    console.log(JSON.stringify(data));
    new Chart(document.getElementById("esp-pie-chart"), {
      type: 'doughnut',
      data: { 
        labels: ["UNCONFIGURED ("+data.esps[0].count+")", "CONFIGURED ("+data.esps[1].count+")"],
        datasets: [{
          label: "count",
          backgroundColor: ["orangered","limegreen"],
          data: [data.esps[0].count,data.esps[1].count]
        }]
      },
      options: {
        legend:{
          position:'right'
        },
        title: {
          display: true,
          fontSize:20,
          padding:10,
          text: 'ESPs'
        }
      }
    });

    new Chart(document.getElementById("sensor-pie-chart"), {
      type: 'doughnut',
      data: {
        labels: [ "ACTUATORS ("+data.sensors[0].count+")","SENSORS ("+data.sensors[1].count+")"],
        datasets: [{
          label: "count",
          backgroundColor: ["orangered","#00B7FF"],
          data: [data.sensors[0].count,data.sensors[1].count]
        }]
      },
      options: {
        legend:{
          position:'right'
        },
        title: {

          display: true,
          fontSize:20,
          padding:10,
          text: 'Sensors'
        }
      }
    });
  });

});