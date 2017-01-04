/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var express = require('express');
var parser = require('body-parser');

var dal = require("./storage.js");

var app = express();
app.use(parser.json());

app.get("/", function(request, response) {
    response.send(dal.AllDevices());
});

app.get("/devices/:id", function(request, response) {
    var device = dal.findDevice(request.params.id);
    if (device) {
        response.send(device);
    } else {
        response.status(404).send();
    }
});

app.post("/devices", function(request, response) {
    // only data that matches with the variable 
    var device = request.body;
    var existingDevice = dal.findDevice(device.mac_address_device);
    if (existingDevice) {
        response.status(409).send({
            message: "id must be unique, it's already registered",
            link: "../devices/" + existingDevice.id
        });
        return;
    }
    dal.saveDevice(device);
    response.status(201).location("../devices/" + device.id).send();
});


console.log("Hello World");
app.listen(1234);

