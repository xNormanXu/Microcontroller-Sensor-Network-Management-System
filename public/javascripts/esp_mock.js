
let ESP_STATE =["STATE_READY","STATE_WIFI_CONNECT","STATE_WIFI_ACTIVE","STATE_ACCESS_POINT_CONNECT","STATE_ACCESS_POINT_ACTIVE",
	"STATE_SLEEP","STATE_BOOTING","STATE_REQUEST_CONFIG","STATE_RESPONSE_CONFIG_DETAILS","STATE_CONFIG_UPDATED","STATE_ACTIVE",
  "STATE_PASSIVE","STATE_ONLINE","STATE_OFFLINE","STATE_OTA_AVAILABLE","STATE_INIT_OTA"];

const STATE_READY = 0;                  
const STATE_WIFI_CONNECT = 1;
const STATE_WIFI_ACTIVE = 2;
const STATE_ACCESS_POINT_CONNECT = 3 ;
const STATE_ACCESS_POINT_ACTIVE = 4;
const STATE_SLEEP =5;

/* ESP specific states */
const STATE_BOOTING =6;
const STATE_REQUEST_CONFIG=7;
const STATE_RESPONSE_CONFIG_DETAILS=8;
const STATE_CONFIG_UPDATED=9;
const STATE_ACTIVE=10;
const STATE_PASSIVE =11;  // if ESP is to be kept idle but connected to WiFi
const STATE_ONLINE=12;
const STATE_OFFLINE =13;
const STATE_OTA_AVAILABLE =14;
const STATE_INIT_OTA =15;

let wsUri = "ws://"+window.location.hostname+":3000";
let output_console;
let espState = STATE_BOOTING;
let samplingFrequency;
let esp_mac = "22:44:66:88:11:33:55"; //"00:11:22:33:44:55:66:77";  //"00:25:96:FF:FE:12:34:56";

function init() {
  
  let ipstr = $("#serverip").data("ip");
  if(ipstr)
    wsUri = "ws://"+ipstr+":3000";
  console.log("ip or hostname "+ipstr );
  console.log("host from url:"+window.location.hostname);

  output_console = document.getElementById("output_console");
  writeToScreen('<span style="color: lightgreen;">Booting... ESP_STATE: ' + ESP_STATE[espState]+'</span>');
  setTimeout(() => {
    startWifi();
    printWifiStatus();
  },700);
}

function startWifi(){
  setTimeout(() => {
    writeToScreen('<span style="color: lightgreen;">check for ssid and password and try connecting to Wifi </span>');    
    initWebsocket();
  }, 500);
}

function printWifiStatus(){
  setTimeout(() => {
    writeToScreen('<span style="color: lightgreen;">WiFi connected </span>');
    writeToScreen('<span style="color: lightgreen;">SSID, IP Address and signal strength displayed on screen </span>');
  },1000);
}

function initWebsocket(){
  websocket = new WebSocket(wsUri);
  window.addEventListener('beforeunload', function(event) {
    //do something here
    websocket.close();
  }, false);
  webSocketEvent();
}

function webSocketEvent() {
  websocket.onopen = function (evt) {
    onOpen(evt)
  };
  websocket.onclose = function (evt) {
    onClose(evt)
  };
  websocket.onmessage = function (evt) {
    onMessage(evt)
  };
  websocket.onerror = function (evt) {
    onError(evt)
  };
}

function onOpen(evt) {
  writeToScreen("WS connection established ");
  let json = { 
    client: 0,
    mac : esp_mac,
    code : STATE_REQUEST_CONFIG,
    ip:"10.0.0.22"
   }

  doSend(json);
}

function onClose(evt) {
  writeToScreen("DISCONNECTED");
}

function onMessage(evt) {
  writeToScreen('<span style="color: cyan;">RESPONSE: ' + evt.data + '</span>');
  let res = JSON.parse(evt.data);
  if(res.state == STATE_RESPONSE_CONFIG_DETAILS){
    writeToScreen("RECEIVED BELOW CONFIGURATION: \n");

    writeToScreen("ESP Model "+res.model_type);
    writeToScreen("Sampling Frequency "+res.sampling_freq);

    for(let i=0;i<res.num_of_pins;i++){
      writeToScreen("Pin "+(i+1)+": ");
      writeToScreen(res.pin_label[i]+" is connected to "+res.sensors[i]+"'s "+res.sensor_pin[i]+" pin in "+res.pin_mode[i]+" mode ");
      writeToScreen("Additional info: "+res.misc_keys[i]+" : "+res.misc_val[i]);

    }

  }else if(res.state == STATE_CONFIG_UPDATED){

  }else{

  }


}

function onError(evt) {
  writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function doSend(message) {
  writeToScreen('<span style="color: yellow;">SENT: ' + JSON.stringify(message) +'</span>');
  websocket.send(JSON.stringify(message));
}

function writeToScreen(message) {
  var pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output_console.appendChild(pre);
}