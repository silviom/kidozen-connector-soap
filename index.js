var soap = require("soap"),
    client = null;

module.exports = function(config){
    
    this.config = config;
    this.isConnected = isConnected;
    this.connect = connect;
    this.disconnect = disconnect;
    this.execute = execute;
};

var isConnected = function(){
    return !!client;
};

var connect = function(cb){
    soap.createClient (this.config.endpoint, function (err, result) {
        if (err) {
            var message = stringify("SOAP Connector: Can not connect to server - ", err);
            winston.error(message);
            if (cb) cb(new Error(message));
            return;
        }

        client = result;
        if (cb) cb();
    });

};

var disconnect = function(cb){

};

var execute = function(method, args, cb){
    
    if (!client) {
        var message = "Connector is not connected.";
        winston.error(message);
        if (cb) cb(new Error(message));
        return;
    }

    var params = [].concat(args);
    if (cb) params.push(cb);

    client[method].apply (client, params);
};

var stringify = function(message, data){
    var result = message;
    if (data) result += " " + JSON.stringify(data, null, "  ");
    return result;
};

