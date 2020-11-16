const mosca = require('mosca');

exports.initMqttServer = function(server) {
    
    var broker = new mosca.Server(server);

    broker.on('ready', () => {
        console.log('Broker is ready!');
    });

    broker.on('connect', function(client) {
        console.log('Client connected : ', client.id);
    });

}