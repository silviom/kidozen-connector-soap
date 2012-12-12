var soap = require("soap");

module.exports = function(config){
    
    var client = null;
    this.config = config;
    
    this.isConnected = function(){
        return !!client;
    };

    this.connect = function(cb){
        soap.createClient (this.config.endpoint, function (err, result) {
            if (err) {
                var message = "SOAP Connector: Can not connect to server - " + JSON.stringify(err, null, "  ");
                console.log(message);
                if (cb) cb(new Error(message));
                return;
            }

            client = result;
            if (cb) cb();
        });
    };

    this.disconnect = function(cb){

    };

    this.execute = function(method, args, cb){
        
        if (!client) {
            var message = "Connector is not connected.";
            console.log(message);
            if (cb) cb(new Error(message));
            return;
        }

        var params = [].concat(args);
        if (cb) params.push(cb);

        client[method].apply (client, params);
    };
};