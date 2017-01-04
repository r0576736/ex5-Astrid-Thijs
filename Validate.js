/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


module.exports = {

  fieldsNotEmpty: function (object) {                           //velden mogen niet leeg zijn
    var errors = [];                                            //error weergeven
    for (i = 1; i < arguments.length; i++) {    
      if (!this.fieldNotEmpty(object, arguments[i])) {
        errors.push(arguments[i]);
      }
    }
    ;
    return errors.length === 0 ? null : errors;
  },

  fieldNotEmpty: function (object, field) {                     //veld mag niet leeg zijn
    return object && object[field] && object[field] !== "";
  },

  fieldCorrectType: function() {                                //velden moeten juist type hebben

  }
};

console.log("Validate check");                                  //checken of validatie werkt