// connect to the Mongo Database
var constants = require('./constants');
var utils = require('./utils');
var mongo = require('mongodb');
var monk = require('monk');

// <MODIFY>
var db = monk(constants.mongodburl);

/* SENSOR */

// ALSO use for update
exports.addNewSensor = function (ssr, succ, fail) {
    var collection = db.get('sensor_collection');
    ssr.category = parseInt(ssr.category);
    collection.update({
        model_type: ssr.model_type
    }, ssr, {
        upsert: true
    }, function (err, result) {
        if (err === null) {
            succ(result);
        } else {
            fail(err);
        }
    });
}

// NOT USING THIS - USING add with upsert to modify existing sensor
exports.updateSensorWithType = function (id, sensor, succ, fail) {
    var collection = db.get('sensor_collection');
    sensor.category = parseInt(sensor.category);
    collection.update({
        model_type: id
    }, {
        $set: sensor
    }, function (err, result) {
        if (err === null) {
            succ(result);
        } else {
            fail(err);
        }
    });
}

exports.removeSensorByType = function (t, succ, fail) {
    var collection = db.get('sensor_collection');
    collection.remove({
        model_type: t
    }, function (err, result) {
        if (err === null) {
            succ(result);
        } else {
            fail(err);
        }
    });
}

/* sort
    0 - sort by name ascending ; 
    1 sort by name desc ; 
    2 sort by model_type asc ; 
    3 sort by model_type desc ;
    4 sort by category;
*/
exports.getAllSensors = function (sort, succ, fail) {
    var collection = db.get('sensor_collection');
    let filter = {
        sort: {
            name: 1
        }
    };
    switch (sort) {
        case 1:
            filter = {
                sort: {
                    name: -1
                }
            };
            break;
        case 2:
            filter = {
                sort: {
                    model_type: 1
                }
            };
            break;
        case 3:
            filter = {
                sort: {
                    model_type: -1
                }
            };
            break;
        case 4:
            filter = {
                sort: {
                    category: -1,
                    name: 1
                }
            };
            break;
        default:
            break;
    }

    collection.find({}, filter, function (err, docs) {
        if (err === null) {
            succ(docs);
        } else {
            fail(err);
        }
    });
}

exports.getAllSensorNames = function (succ, fail) {
    var collection = db.get('sensor_collection');
    let filter = {
        sort: {
            model_type: 1
        }
    };
    collection.find({}, filter, function (err, docs) {
        if (err === null) {
            succ(docs);
        } else {
            fail(err);
        }
    });
}

exports.getSensorById = function (id, succ, fail) {

    var collection = db.get('sensor_collection');
    collection.findOne({
        model_type: id
    }, {}, function (err, doc) {
        if (err === null) {
            succ(doc);
        } else {
            fail(err);
        }
    });
}

exports.getSensorCount = function (succ, fail) {

    var collection = db.get('sensor_collection');
    collection.aggregate([{
            "$group": {
                _id: "$category",
                count: {
                    $sum: 1
                }
            }
        },
        {
            "$sort": {
                _id: 1
            }
        }
    ], function (err, doc) {
        if (err === null) {
            succ({
                sensors: doc
            });
        } else {
            fail(err);
        }
    });
}


/* ESP */

// USE FOR ADD NEW and UPDATE existing Esp - using upsert : Update and/or insert
exports.upsertEsp = function (esp, succ, fail) {
    var collection = db.get('microcontroller_collection');
    if (!esp.status) {
        esp.status = 0;
    } else {
        esp.status = parseInt(esp.status);
    }
    // collection.insert(esp, function (err, result) 
    collection.update({
        mac: esp.mac
    }, esp, {
        upsert: true
    }, function (err, result) {
        if (err === null) {
            succ(result);
        } else {
            fail(err);
        }
    });
}

exports.removeEspWithMac = function (del, succ, fail) {
    // 'del' is 'mac' : Shall be constructed in API wrapper
    var collection = db.get('microcontroller_collection');
    collection.remove(del, function (err, result) {
        if (err === null) {
            db.get('configuration_collection').remove(del, function (e, r) {
                if (e === null) {
                    console.log("WAS DELETED: " + r);
                    succ(result);
                } else {
                    fail(e);
                }
            });

        } else {
            fail(err);
        }
    });
}

exports.updateEspWithMac = function (mac, esp, succ, fail) {
    var collection = db.get('microcontroller_collection');
    collection.update({
        mac: mac
    }, {
        $set: esp
    }, function (err, result) {
        if (err === null) {
            succ(result);
        } else {
            fail(err);
        }
    });

}

exports.getAllMicrocontrollers = function (filter, succ, fail) {
    console.log("FILTER: " + filter);
    var collection = db.get('microcontroller_collection');
    let fltr;
    if (filter === null || filter === undefined) {
        fltr = {};
    } else {
        // 0 uncongifured ; 1 configures ; 2 ota available [not used]
        fltr = {
            status: filter%2
        };
    }
    collection.find(fltr, {
        sort: {
            status: 1,
            name: 1
        }
    }, function (err, docs) {
        if (err === null) {
            succ(docs);
        } else {
            fail(err);
        }
    });
}

// OPTIONAL FUNCTION : USE FOR PAGINATED DATA
exports.getAllEspsPagewise = function (page, size, succ, fail) {
    var collection = db.get('microcontroller_collection');
    collection.find({}, {
            sort: {
                name: 1
            },
            limit: size,
            skip: (page - 1) * size
        },
        function (err, docs) {
            if (err === null) {
                console.log(page + " " + size);
                succ(docs);
            } else {
                fail(err);
            }
        });
}

exports.getEspByMac = function (mac, succ, fail) {

    var collection = db.get('microcontroller_collection');
    collection.findOne({
        mac: mac
    }, {}, function (err, doc) {
        if (err === null) {
            succ(doc);
        } else {
            fail(err);
        }
    });
}

exports.getEspCount = function (succ, fail) {

    var collection = db.get('microcontroller_collection');
    var count = {};
    collection.aggregate([{
            "$group": {
                _id: "$status",
                count: {
                    $sum: 1
                }
            }
        },
        {
            "$sort": {
                _id: 1
            }
        }
    ], function (err, doc) {
        if (err === null) {
            let responseJson = {
                timestamp: utils.getTimestamp(),
                esps: doc
            }
            succ(responseJson);
        } else {
            fail(err);
        }
    });
}

/**************** network ****************/

// update or insert network
exports.upsertNetwork = function (network, succ, fail) {
    var collection = db.get('network_collection');
    collection.update({
        name: network.name
    }, network, {
        upsert: true
    }, function (err, result) {
        if (err === null) {
            succ(result);
        } else {
            fail(err);
        }
    });
}

exports.getAllNetworks = function (succ, fail) {
    var collection = db.get('network_collection');
    collection.find({}, function (err, docs) {
        if (err === null) {
            succ(docs);
        } else {
            fail(err);
        }
    });
}

exports.getNetworkByName = function (name, succ, fail) {
    var collection = db.get('network_collection');
    collection.findOne({
        name: name
    }, {}, function (err, doc) {
        if (err === null) {
            succ(doc);
        } else {
            fail(err);
        }
    });
}

exports.removeNetworkByName = function (name, succ, fail) {
    var collection = db.get('network_collection');
    collection.remove({
        name: name
    }, function (err, result) {
        if (err === null) {
            succ(result);
        } else {
            fail(err);
        }
    });
}

// exports.getAllMicrocontrollers = function (filter, succ, fail) {
//     console.log("FILTER: " + filter);
//     var collection = db.get('microcontroller_collection');
//     let fltr;
//     if (filter === null || filter === undefined) {
//         fltr = {};
//     } else {
//         // 0 uncongifured ; 1 configures ; 2 ota available [not used]
//         fltr = {
//             status: filter%2
//         };
//     }
//     collection.find(fltr, {
//         sort: {
//             status: 1,
//             name: 1
//         }
//     }, function (err, docs) {
//         if (err === null) {
//             succ(docs);
//         } else {
//             fail(err);
//         }
//     });
// }

/* CONFIGURATION  */

exports.upsertConfiguration = function (configuration, succ, fail) {

    var collection = db.get('configuration_collection');
    collection.update({
        mac_address: configuration.mac_address
    }, configuration, {
        upsert: true
    }, function (err, result) {
        if (err === null) {
            succ(result);
        } else {
            fail(err);
        }
    });

    // var collection = db.get('configuration_collection');
    // collection.update({
    //     mac_address: obj.mac_address
    // }, obj, {
    //     upsert: true
    // }, function (err, result) {
    //     if (err === null) {
    //         let esp = {
    //             mac: obj.mac,
    //             status: 1
    //         }
    //         db.get('configuration_collection').update({
    //             mac: obj.mac
    //         }, {
    //             $set: esp
    //         }, function (e, r) {
    //             if (err === null) {
    //                 succ(result);
    //             } else {
    //                 fail(e);
    //             }
    //         });
    //     } else {
    //         fail(err);
    //     }
    // });
}

exports.removeConfigurationById = function (id, succ, fail) {

    var collection = db.get('configuration_collection');
    collection.remove({
        mac: id
    }, function (err, result) {
        if (err === null) {
            succ(result);
        } else {
            fail(err);
        }
    });
}

exports.updateConfigurationById = function (mac, conf, succ, fail) {

    var collection = db.get('configuration_collection');
    collection.update({
        mac: mac
    }, {
        $set: conf
    }, function (err, result) {
        if (err === null) {
            succ(result);
        } else {
            fail(err);
        }
    });
}

exports.getConfigurationByEspId = function (eid, forESP, succ, fail) {
    //eid is mac
    let filter = {};
    if(forESP){
        console.log("check forESP!!!")
        filter = {
            fields: {
                _id: 0, mac:0,model_type: 0,num_of_pins:0,pin_label:0
                
            }
        };
    }
    var collection = db.get('configuration_collection');
    collection.findOne({
        mac_address: eid
    }, filter, function (err, doc) {
        if (err === null) {
            succ(doc);
        } else {
            fail(err);
        }
    });
}

/* DATA */

exports.insertSensorData = function (obj, succ, fail) {
    // obj contains data collected from the ESP's sensors

    /* RECEIVED FORMAT (JSON Object): 
        { "mac": "60:01:94:5D:97:72",
            "timestamp": 1543988228,
            "data":{"pressed" :1, "power" : 1} 
        } 

      Need to convert to REQUIRED FORMAT (JSON Array): 
        [ {"esp_id": "60:01:94:5D:97:72",
            "timestamp": 1543988228,
            "parameter": "POWER",
            "value": 1
          },
          {"esp_id": "60:01:94:5D:97:72",
            "timestamp": 1543988228,
            "parameter": "PRESSED",
            "value": 1
          }
        ]
    */
    var collection = db.get('data_collection');

    var jsonArr = [];
    if((Object.keys(obj.data).length !== 0 && obj.constructor === Object)){
        for (var key in obj.data) {
            var entry = {};
            entry.esp_id = obj.mac;
            entry.timestamp = utils.getTimestamp();

            if (obj.data.hasOwnProperty(key)) {
                entry.parameter = key;
                entry.value = obj.data[key];
                jsonArr.push(entry);
            }
        }
    }

    collection.insert(jsonArr, function (err, result) {
        if (err === null) {
            succ(result);
        } else {
            fail(err);
        }
    });
}

exports.getSensorDataByEspId = function (eid, page, size, param, succ, fail) {
    //eid is mac addr
    var collection = db.get('data_collection');
    collection.find({
            mac: eid,
            parameter: param
        }, {
            sort: {
                timestamp: -1
            },
            limit: size,
            skip: (page - 1) * size
        },
        function (err, data) {
            if (err === null) {
                succ(data);
            } else {
                fail(err);
            }
        });
}

exports.getEspDataFields = function (eid, succ, fail) {
    var collection = db.get('data_collection');
    collection.distinct("parameter",{
        esp_id: eid
    }, function (err, data) {
        if (err === null) {
            succ(data);
        } else {
            fail(err);
        }
    });
}

exports.getEspDataPagewise = function (eid, param, page, size, succ, fail) {
    var collection = db.get('data_collection');
    collection.find({
        esp_id: eid,
        parameter: param
    }, {
        sort: {
            timestamp: -1
        },
        limit: size,
        skip: (page - 1) * size
    }, function (err, data) {
        if (err === null) {
            succ(data);
        } else {
            fail(err);
        }
    });
}