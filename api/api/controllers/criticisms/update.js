var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Update one',


  description: '',


  inputs: {

    id : {
      type: 'string'
    }, 
    
    response : {
      type: 'string'
    } 
  
  },


  exits: {

  },


  fn: async function (inputs, res) {

    let result = await Criticisms.updateOne({
      id: inputs.id
    })
    .set({
      response: inputs.response
    });
    
    result.isResponsed = true;  
    
    moment.locale('en');
    result.jalaaliCreatedDate = momentJalaali(result.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    moment.locale('fa');
    result.jalaaliUserFriendlyCreatedDate = moment(result.createdAt).fromNow();
    return result;

  }


};
