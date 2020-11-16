let JSON_MESSAGES = {

  // internal to ESP
  STATE_READY:{ },
  STATE_WIFI_CONNECT:{ },
  STATE_WIFI_ACTIVE:{ },
  STATE_ACCESS_POINT_CONNECT:{ },
  STATE_ACCESS_POINT_ACTIVE:{ },
  STATE_SLEEP:{ },
  STATE_BOOTING:{ },

  // from ESP
  STATE_REQUEST_CONFIG:{

    client: 0,
    mac : esp_mac,
    code : STATE_REQUEST_CONFIG

  },
  // from Server
  STATE_RESPONSE_CONFIG_DETAILS:{
    code : STATE_RESPONSE_CONFIG_DETAILS,
    state : STATE_OTA_AVAILABLE / STATE_ACTIVE / STATE_PASSIVE,
    samplingFrequency :10000,
    configuration : {
      DHT11 : {signal: 0}

    }

  },
  // from Server
  // should put ESP in the STATE_REQUEST_CONFIG
  STATE_CONFIG_UPDATED:{
    code : STATE_CONFIG_UPDATED,
    state : STATE_OTA_AVAILABLE / STATE_REQUEST_CONFIG
  },
  // from ESP
  STATE_ACTIVE: {
    client: 0,
    mac : esp_mac,
    code : STATE_ACTIVE ,
    data : {}

  },
  // from ESP
  STATE_PASSIVE: {
    client: 0,
    mac : esp_mac,
    code : STATE_PASSIVE
  },
  // internal to ESP
  STATE_ONLINE: { },
  STATE_OFFLINE: { },
  // from Server as a part of response STATE_RESPONSE_CONFIG_DETAILS or trigger STATE_CONFIG_UPDATED
  STATE_OTA_AVAILABLE: {
    state : STATE_OTA_AVAILABLE,
    url: "some/url/for/ota",
    deviceId: "HEXCODE"

  },
  // internal to ESP
  STATE_INIT_OTA:{
    state: STATE_INIT_OTA
   }

}