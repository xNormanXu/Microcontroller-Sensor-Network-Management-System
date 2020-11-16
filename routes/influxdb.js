const Influx = require('influx');
const client = new Influx.InfluxDB({
    host: "localhost",
    port: 8086,
    database: "IoT"
})

exports.init = function() {
    client.getDatabaseNames().then(names => {
        if (!names.includes("IoT")) {
            return client.createDatabase("IoT");
        }
    });
}

exports.save = function(point) {
    client.writePoints([
        point
    ]);
}

exports.query = function(measurement) {
    client.queryRaw(`select * from ${measurement} order by time`)
        .then(result => {
            return result;
    })
}
