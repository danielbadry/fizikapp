var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Find',


  description: 'Find criticisms.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let allCriticisms = await Criticisms.find();
    
    for (let criticism of allCriticisms) { 
      criticism.isResponsed = false;
      moment.locale('en');
      criticism.jalaaliCreatedDate = momentJalaali(criticism.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      criticism.jalaaliUserFriendlyCreatedDate = moment(criticism.createdAt).fromNow();
    }

    return allCriticisms;
  }

};
