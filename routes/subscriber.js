const mqtt = require('mqtt')
const constants = require('./constants');
var influxdb = require('./influxdb');
var db = require('./database');

exports.initSubscriber = function() {

    // connect to mqtt broker
    const client = mqtt.connect('mqtt://localhost')

    // subscribe control channel
    client.subscribe(constants.CONTROL);
    // subscribe data channel
    client.subscribe(constants.DATA);
    
    client.on('message', (topic, message) => {
        var msg = {};

        // parse message into JSON
        try {
            msg = JSON.parse(message.toString());
        } catch (exception) {
            console.warn("No JSON data received: " + message);
        }

        // msg is not empty
        if (msg !== '{}') {
            // control channel
            if (topic == constants.CONTROL) {
                console.log("Receive control message: " + JSON.stringify(msg));
                // send configuration message
                db.getConfigurationByEspId(msg.mac, 0, configuration => {
                    console.log("Publish configuration message: " + JSON.stringify(configuration));
                    // publish microcontroller configuration
                    client.publish(constants.CONFIGURATION, JSON.stringify(configuration));
                    // initialize influxdb 
                    influxdb.init();
                }, error => {
                    console.warn("Error while searching in microcontroller_collection: " + error);
                });
            }

            // data channel
            if (topic == constants.DATA) {
                // handle message from microcontroller
                if (msg) {
                    console.log("Receive data message : " + JSON.stringify(msg));

                    // create and edit point
                    var point = {
                        measurement: msg.measurement,
                        tags: msg.tags,
                        fields: msg.fields,
                    }
                    // save point to influxdb
                    influxdb.save(point);
                }
            }
        }
    });

}