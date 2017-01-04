/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {

    Devices: {},

    saveDevice: function(device) {                          //toestel opslagen in locale datastore 'dal'
        this.devices[device.id] = device;                   
    },
    AllDevices: function() {                                //alle toestellen weergeven
        var rtnValue = [];
        for (var item in this.devices) {
            rtnValue.push(this.devices[item]);
        };
        return rtnValue;
    },
    findDevice: function(id) {                              //toestel opzoeken
        return this.devices[id];
    },
    
    
    Alarms: {}, 

    saveAlarm: function(alarm) {                            //alarm opslagen in datastore 'dal'
        this.alarms[alarm.id] = alarm;  
    },
    AllAlarms: function() {                                 //alle alarmen weergeven
        var rtnValue = [];
        for (var item in this.alarms) {
            rtnValue.push(this.alarms[item]);
        };
        return rtnValue;
    },

    findAlarm: function(id) {                               //een alarm opzoeken
        return this.alarms[id];
    },
    
    
    WhiteLists: {},

    saveWhiteList: function(whitelist) {                    //record van whitelist opslagen in datastore 'dal'
        this.WhiteLists[whitelist.id] = whitelist;
    },
    AllWhiteLists: function() {                             //gehele lijst weergeven
        var rtnValue = [];
        for (var item in this.WhiteLists) {
            rtnValue.push(this.WhiteLists[item]);
        };
        return rtnValue;
    },
    findWhiteList: function(id) {                           //record opzoeken in de gehele lijst
        return this.WhiteLists[id];
    }
};


console.log("Storage check");                               //checken of data opslag werkt