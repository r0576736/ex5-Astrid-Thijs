/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


module.exports = {

  fieldsNotEmpty: function (object) {
    var errors = [];
    for (i = 1; i < arguments.length; i++) {
      if (!this.fieldNotEmpty(object, arguments[i])) {
        errors.push(arguments[i]);
      }
    }
    ;
    return errors.length === 0 ? null : errors;
  },

  fieldNotEmpty: function (object, field) {
    return object && object[field] && object[field] !== "";
  },

  fieldCorrectType: function() {

  }
};

console.log("Validate check");