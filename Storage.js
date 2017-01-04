/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

module.exports = {
    devices: {},

    saveDevice: function(device) {
        this.devices[device.id] = device;
    },
    AllDevices: function() {
        var rtnValue = [];
        for (var item in this.devices) {
            rtnValue.push(this.devices[item]);
        };
        return rtnValue;
    },
    findDevice: function(id) {
        return this.devices[id];
    }
};


console.log("Check");