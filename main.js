//Jelle heeft mij geholpen met de resources. 
//Genzo heeft mij geholpen bij de code. 


var express = require('express');                                               //webserver
var parser = require('body-parser');                                            //body uitlezen  
var uuid = require('uuid');                                                     //zorgt voor unieke id

var dal = require("./Storage.js");                                              //locale datastore 'dal'
var validation = require("./Validate.js");                                      //controleert of de velden uniek; niet leeg of juist ingevuld zijn.
    
var app = express();                                                            //webserver variabele aanmaken
app.use(parser.json());                                                         //automatische body parser, meegeven in request



//Devices

app.get("/Devices", function(request, response) {                               //alle toestellen opvragen die gecapteerd zijn en hun specificaties
    response.send(dal.AllDevices());
});

app.get("/Devices/:id", function(request, response) {                           //een enkel toestel opvragen met de id van het toestel 
    var device = dal.findDevice(request.params.id);
    if (device) {                                                               //als id bestaat, toestel weergeven met de bepaalde specificaties
        response.send(device);
    } else {                                                                    // als id niet bestaat, error weergeven
        response.status(404).send();                
    }
});

app.post("/Devices", function(request, response) {                              //een toestel toevoegen
    var device = request.body;

    var errors = validation.fieldsNotEmpty(device, "mac_address_device", "time_captured", "distance"); 
    //als je een toestel wil toevoegen moeten alle bovenstaande orange velden worden ingevuld
    if (errors) {
        response.status(400).send({
            message: "Following field(s) are mandatory:" + errors.concat()      //als er een veld niet of onjuist is ingevuld, error weergeven
        });
        return;
    }

   
    var existingDevice = dal.findDevice(device.mac_address_device);                             //bestaand toestel opzoeken
    if (existingDevice) {       
        response.status(409).send({                                             //bestaat het al? bericht sturen dat het al bestaat
            message: "id must be unique, it's already registered",
            link: "../Devices/" + existingDevice.id                         
        });
        return;                                                                 //toestel toevoegen
    }

    device.id = uuid.v4();                                                      //automatisch unieke id toevoegen
    dal.saveDevice(device);                                                     //opslagen in locale datastore
    response.status(201).location("../Devices/" + device.id).send();            //toestel weergeven en status 201 teruggeven, ok
});



//Alarms

app.get("/Alarms", function(request, response) {                                //alle alarmen opvragen en hun specificaties
    response.send(dal.AllAlarms());             
});

app.get("/Alarms/:id", function(request, response) {                            //een alarm opvragen met bepaalde id
    var alarm = dal.findAlarm(request.params.id);                               //alarm opzoeken
    if (alarm) {                                                                //als het bestaat, alarm weergeven
        response.send(alarm);
    } else {                                                                    //als het niet bestaat, error weergeven
        response.status(404).send();
    }
});


app.post("/Alarms", function(request, response) {                               //een alarm toevoegen
    var alarm = request.body;
    var errors = validation.fieldsNotEmpty(alarm, "name_drone", "location", "type_alarm", "time_alarm", "notification", "type_notification", "important_alarm");
    //als je een alarm toevoegt moeten bovenstaande orange velden ingevuld worden
    if (errors) {                   
        response.status(400).send({                                             //als het veld leeg is of onjuist wordt ingevuld, komt er een error
            message: "Following field(s) are mandatory:" + errors.concat()
        });
        return;                                                                 //alarm toevoegen
    }

    alarm.id = uuid.v4();                                                       //automatisch unieke id geven
    dal.saveAlarm(alarm);                                                       //opslagen in 'dal'
    response.status(201).location("../Alarms/" + alarm.id).send();              //toestel weergeven en status 201 teruggeven, ok
});



//WhiteLists

app.get("/WhiteLists", function(request, response) {                            //lijst van toestellen opvragen die op whitelist staat en hun specificaties
    response.send(dal.AllWhiteLists());                     
});

app.get("/WhiteLists/:id", function(request, response) {                        //een bepaalde record opvragen via de id
    var whitelist = dal.findWhiteList(request.params.id);                       //record opzoeken in datastore
    if (whitelist) {                                                            //als het bestaat, record weergeven met specificaties
        response.send(whitelist);
    } else {                                                                    //als het niet bestaat, error weergeven
        response.status(404).send();
    }
});

app.post("/WhiteLists", function(request, response) {                           //een record toevoegen aan whitelist
    var whitelist = request.body;

    var errors = validation.fieldsNotEmpty(whitelist, "name", "function", "mac_address_device", "type_device");
    //bij het toevoegen van een record moeten bovenstaande orange velden worden ingevuld
    if (errors) {
        response.status(400).send({                                             //als het veld leeg is of onjuist wordt ingevuld, komt er een error
            message: "Following field(s) are mandatory:" + errors.concat()  
        });
        return;                                                                 //record toevoegen
    }    
    
    var existingWhiteList = dal.findWhiteList(whitelist.mac_address_device);                    //bestaand record opzoeken in WhiteLists
    if (existingWhiteList) {       
        response.status(409).send({                                             //bestaat het al? bericht sturen dat het al bestaat
            message: "id must be unique, it's already registered",
            link: "../WhiteList/" + existingWhiteList.id                         
        });
        return;                                                                 //record van WhiteList toevoegen
    }

    whitelist.id = uuid.v4();                                                   //automatisch unieke id geven
    dal.saveWhiteList(whitelist);                                               //opslagen in datastore 'dal'
    response.status(201).location("../WhiteLists/" + whitelist.id).send();      //toestel weergeven en status 201 teruggeven, ok
});


console.log("Hello World");                                                     //check
app.listen(1234);                                                               //server wordt gestard op 1234; (localhost:1234)

