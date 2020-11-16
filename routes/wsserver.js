const WebSocket = require('ws');
const url = require('url');
var db = require('./database');
const constants = require('./constants');

// class to create Map<mac,WS> to store websocket connections of each ESP
// NOTE: There is only one ESP module per websocket thus 1:1 mapping based on MAC addr
class Clients{

  constructor(){
    this.clientList = {};
    this.saveClient = this.saveClient.bind(this);
    this.removeClient = this.removeClient.bind(this);
  }
  
  // connect when ESP powered ON
  saveClient(mac,ws){
    this.clientList[mac] = (ws);
  }

  // remove from map if ESPs WS closes due to some reason
  removeClient(mac){
    this.clientList[mac] = null;
  }
  
}

const espObserverMap = new Clients();

// Use this to trigger immediate effect on ESP
exports.triggerEspEvent = function(mac,code){
 
  if(code==constants.STATE_RESPONSE_CONFIG_DETAILS){
    db.getConfigurationByEspId(mac,0,
      configJson=>{
        console.log("Called triggerEspEvent for ESP with mac address: "+mac);
        console.log("SERVER to ESP >>> websockets >>> UPADTED CONFIG: "+JSON.stringify(configJson));
        // Editing response before sending it to ESP.
        configJson.state = constants.STATE_RESPONSE_CONFIG_DETAILS;
        delete configJson._id;
        delete configJson.mac;
        delete configJson.model_type;
        delete configJson.num_of_pins;
        delete configJson.pin_label;
        
        if(espObserverMap.clientList[mac]){
          espObserverMap.clientList[mac].send(JSON.stringify(configJson));
        }
      },e=>{
      res.send("ESP CONFIGURE JS ERROR while fetching ESP config :"+ JSON.stringify(e));
    });
  }else if(code == constants.STATE_INIT_OTA){
    if(espObserverMap.clientList[mac]){
      console.log("sent OTA TRIGGER to ESP ");
      espObserverMap.clientList[mac].send("{'state':" + constants.STATE_OTA_AVAILABLE +"}");      
    }
  }else{
    console.log("WS SERVER: UNKNOWN EVENT = "+code +" TRIGERRED.");
  }

}

exports.initWebSocketServer = function (server) {
 
  const wss = new WebSocket.Server({
    server
  });

  wss.on('connection', function connection(ws, req) {
    const location = url.parse(req.url, true);
    let mac ="";
    ws.on('message', function incoming(message) {
      
      var msg={};
      try{
        msg = JSON.parse(message);
      }catch(excp){
        console.warn("WARNING !!! non JSON data received: "+message);
      }
      // Manage ESP WS connections via Map like structure: 
      // Add ws to map with MAC as key Map<mac,ws>
      mac = msg.mac;
      espObserverMap.saveClient(msg.mac,ws);
      var ip = req.connection.remoteAddress.split(":");
      ip = ip[ip.length-1];
      
      // Handle message from ESP
      if(msg){  
        console.log("ESP Message : " + JSON.stringify(msg));
        //ESP requested config from server
        if (msg.code == constants.STATE_REQUEST_CONFIG) { 
          console.log("Configuration Request received");
          //check if ESP config is present in based on MAC address
          // IF Yes : check config table for configurations info to send back

          db.getEspByMac(msg.mac,function(doc){
              if(doc && doc.mac === msg.mac){
                console.log("Found information in microcontroller_collection, looking for configuration "+doc.status+":"+doc.mac);
                if( doc.status == constants.ESP_CONFIGURED){
                  db.getConfigurationByEspId(doc.mac,1,function(conf){
                    conf.state=constants.STATE_RESPONSE_CONFIG_DETAILS;
                    // conf.code = constants.STATE_ACTIVE; // default to Active
                    ws.send(JSON.stringify(conf));
                  },(er)=>{
                    console.warn("Error while searching in microcontroller_collection: "+er);
                  });
                }else{
                  console.log(msg.mac+" not yet configured");
                }
          // ELSE No: Add the ESP to the microcontroller_collection and make it configured status as [unconfigured]
              }else{
                // Creating new entry with Wifi Mac address of ESP8266
                let newEsp = {
                  "mac":msg.mac,
                  // IP from request to server [not much use but for keep sake]
                  "ip":ip,
                  "status":0,
                  "name":"ESP_"+msg.mac,
                  "description":"Newly added unconfigured ESP8266 with MAC address: "+msg.mac,
                  "model_type":"ESP8266",
                  "num_of_pins":2,
                  "pins" : [
                      {
                          "pin_label" : "GPIO_0",
                          "pin_num" : "0"
                      },
                      {
                          "pin_label" : "GPIO_2",
                          "pin_num" : "2"
                      }
                  ]
                };
                db.upsertEsp(newEsp,function(doc){
                  console.log("Added new microcontroller to microcontroller_collection as unconfigured: "+msg.mac);
                },er=>{
                  console.warn("Error while adding to microcontroller_collection: "+er);
                });
              }

            },(err)=>{
              console.warn(err);
          });
          
        // ESP send data to server
        } else if( msg.code == constants.STATE_RECORD_DATA ){
          // Take the data and insert into the data_collection
          db.insertSensorData(msg,result =>{
            if(espObserverMap.clientList[mac]){
              console.log("SAVED data in data_collection "+result);
              // can send ACK to ESP about received data
              // espObserverMap.clientList[mac].send("{'state':"+constants.STATE_DATA_ACK+"}");
            }
          },e=>{
            res.send("JS ERROR while storing sensor data from ESP to db :"+ JSON.stringify(e));
          });
        }else {

        }
      }

      console.log('Server received code: '+msg.code+' from  IP :'+ ip);

    });

    ws.on('error', function errCloseConnection(error) {
      espObserverMap.removeClient(mac);
      console.log("WS ERROR: " + error +" for MAC: "+mac);
    });

    ws.on('close', function closeConnection() {
      espObserverMap.removeClient(mac);
      console.log('WS DISCONNECT: ' + mac + ' disconnected from ESP WS Server whose ip was ' + req.connection.remoteAddress);
    });

  });

};