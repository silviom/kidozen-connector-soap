var soap = require("soap");

module.exports = function(config){
    
    var client = false;
    this.config = config;
    
    this.isConnected = function(){
        console.log("isConnected", !!this.client);
        return !!this.client;
    };

    this.connect = function(cb){
        console.log("connect", !!this.client);
        var that = this;
        soap.createClient (this.config.endpoint, function (err, result) {
            console.log("connect res", err, typeof result);
            if (err) {
                var message = "SOAP Connector: Can not connect to server - " + JSON.stringify(err, null, "  ");
                console.log(message);
                if (cb) cb(new Error(message));
                return;
            }

            that.client = result;
            if (cb) cb();
        });
    };

    this.disconnect = function(cb){

    };

    this.execute = function(method, args, cb){
        console.log ("execute", !!this.client);
        if (!this.client) {
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