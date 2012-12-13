var soap = require("soap");

module.exports = function(config){
    
    var client = false;
    this.config = config;
    
    this.isConnected = function(){
        return !!this.client;
    };

    this.connect = function(cb){
        var that = this;
        soap.createClient (this.config.endpoint, function (err, result) {
            if (err) {
                if (cb) cb(new Error("SOAP Connector: Can not connect to server - " + JSON.stringify(err, null, "  ")));
                return;
            }

            that.client = result;
            if (cb) cb();
        });
    };

    this.disconnect = function(cb){

    };

    this.execute = function(method, args, cb){
        console.log("-------------------------", method, args, this.client);

        if (!this.client) {
            if (cb) cb(new Error("Connector is not connected."));
            return;
        }

        var params = [].concat(args);
        if (cb) params.push(cb);

        var func = this.client[method];
        if (!func) {
            if (cb) cb(new Error("The method '" + method + "' does not exist."));
            return;
        }

        console.log("-------------------------", this.client, params);
        func.apply (this.client, params);
    };
};