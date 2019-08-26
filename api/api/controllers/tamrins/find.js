var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Find',


  description: 'Find tamrins.',


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
    },

    tajrobi: {
      type: 'boolean'
    },

    riazi: {
      type: 'boolean'
    },
    
    startedDate: {
      type: 'string'
    },
    
    endDate: {
      type: 'string'
    },

  },


  exits: {

  },


  fn: async function (inputs) {

    let finalData = {};
    let dataLength = await Tamrins.find();
    let allTamrins = await Tamrins.find()
    .limit(inputs.limit)
    .skip(inputs.skip)
    ;
    for (let tamrin of allTamrins) {
      moment.locale('en');
      tamrin.jalaaliCreatedDate = momentJalaali(tamrin.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      tamrin.jalaaliUserFriendlyCreatedDate = moment(tamrin.createdAt).fromNow();   
      tamrin.jalaaliUserFriendlyCreatedDate = moment(tamrin.createdAt).fromNow();
      tamrin.jalaaliFullUserFriendlyCreatedDate = tamrin.jalaaliCreatedDate + ' ' + tamrin.jalaaliUserFriendlyCreatedDate;
    }
    finalData.dataLength = dataLength.length;
    finalData.data = allTamrins;
    return finalData;

  }


};
