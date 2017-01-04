/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {

    Devices: {},

    saveDevice: function(device) {                          //toestel opslagen in locale datastore 'dal'
        this.Devices[device.id] = device;                   
    },
    AllDevices: function() {                                //alle toestellen weergeven
        var rtnValue = [];
        for (var item in this.Devices) {
            rtnValue.push(this.Devices[item]);
        };
        return rtnValue;
    },
    findDevice: function(id) {                              //toestel opzoeken
        return this.Devices[id];
    },
    
    
    Alarms: {}, 

    saveAlarm: function(alarm) {                            //alarm opslagen in datastore 'dal'
        this.Alarms[alarm.id] = alarm;  
    },
    AllAlarms: function() {                                 //alle alarmen weergeven
        var rtnValue = [];
        for (var item in this.Alarms) {
            rtnValue.push(this.Alarms[item]);
        };
        return rtnValue;
    },
    findAlarm: function(id) {                               //alarm opzoeken in de gehele lijst
        return this.Alarms[id];
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