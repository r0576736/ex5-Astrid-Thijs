/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var express = require('express');
var parser = require('body-parser');
var uuid = require('uuid'); 

var dal = require("./Storage.js");
var validation = require("./Validate.js");

var app = express();
app.use(parser.json());



//Devices

app.get("/Devices", function(request, response) {
    response.send(dal.AllDevices());
});

app.get("/Devices/:id", function(request, response) {
    var device = dal.findDevice(request.params.id);
    if (device) {
        response.send(device);
    } else {
        response.status(404).send();
    }
});

app.post("/Devices", function(request, response) {
    var device = request.body;

    var errors = validation.fieldsNotEmpty(device, "mac_address", "time_captured", "distance");
    if (errors) {
        response.status(400).send({
            message: "Following field(s) are mandatory:" + errors.concat()
        });
        return;
    }

   
    var existingDevice = dal.findDevice(device.mac_address_device);
    if (existingDevice) {
        response.status(409).send({
            message: "id must be unique, it's already registered",
            link: "../Devices/" + existingDevice.id
        });
        return;
    }

    device.id = uuid.v4();
    dal.saveDevice(device);
    response.status(201).location("../Devices/" + device.id).send();
});



//Alarms

app.get("/Alarms", function(request, response) {
    response.send(dal.AllAlarms());
});

app.get("/Alarms/:id", function(request, response) {
    var alarm = dal.findAlarm(request.params.id);
    if (alarm) {
        response.send(alarm);
    } else {
        response.status(404).send();
    }
});


app.post("/Alarms", function(request, response) { 
    var alarm = request.body;
    var errors = validation.fieldsNotEmpty(alarm, "name_drone", "location", "type_alarm", "time_alarm", "notification", "type_notification", "important_alarm");
    if (errors) {
        response.status(400).send({
            message: "Following field(s) are mandatory:" + errors.concat()
        });
        return;
    }

    alarm.id = uuid.v4();
    dal.saveAlarm(alarm);
    response.status(201).location("../Alarms/" + alarm.id).send();
});



//WhiteLists

app.get("/WhiteLists", function(request, response) {
    response.send(dal.AllWhiteLists());
});

app.get("/WhiteLists/:id", function(request, response) {
    var whitelist = dal.findWhiteList(request.params.id);
    if (whitelist) {
        response.send(whitelist);
    } else {
        response.status(404).send();
    }
});

app.post("/WhiteLists", function(request, response) {
    var whitelist = request.body;

    var errors = validation.fieldsNotEmpty(whitelist, "function", "mac_address_device", "type_device");
    if (errors) {
        response.status(400).send({
            message: "Following field(s) are mandatory:" + errors.concat()
        });
        return;
    }

    whitelist.id = uuid.v4();
    dal.saveWhiteList(whitelist); 
    response.status(201).location("../WhiteLists/" + whitelist.id).send();
});


console.log("Hello World");
app.listen(1234);

