var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Find',


  description: 'Find criticisms.',


  inputs: {
    limit: {
      type: 'number'
    },
    
    skip: {
      type: 'number'
    },

    sort: {
      type: 'string'
    },
    
    where: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    let finalData = {};
    let dataLength = await Criticisms.find();
    let allCriticisms = await Criticisms.find()
    .limit(inputs.limit)
    .skip(inputs.skip)
    ;
    
    for (let criticism of allCriticisms) { 
      criticism.isResponsed = false;
      moment.locale('en');
      criticism.jalaaliCreatedDate = momentJalaali(criticism.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      criticism.jalaaliUserFriendlyCreatedDate = moment(criticism.createdAt).fromNow();
    }
    finalData.dataLength = dataLength.length;
    finalData.data = allCriticisms;
    return finalData;
  }

};
