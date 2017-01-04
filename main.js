/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var express = require('express');
var parser = require('body-parser');

var app = express();
app.use(parser.json());

app.get("/", function(request, response) {
    response.send("Hello World");
});

var teller = 3; 

var Device = function(id, mac_address, time_captured, distance){
        this.id = id;
        this.mac_address = mac_address;
        this.time_captured = time_captured;
        this.distance = distance;
};

var devices = [new Device(1, "88.24.22", "14:28", 180)];

app.get("/devices", function(request, response){
        response.send(devices);
});


console.log("Hello World");
app.listen(1234);