var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Find',


  description: 'Find shoppingplans.',


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
    let dataLength = await Shoppingplans.find();
    let allShoppingPlans = await Shoppingplans.find()
    .limit(inputs.limit)
    .skip(inputs.skip)
    ;
    for (let sp of allShoppingPlans) { 
      moment.locale('en');
      sp.jalaaliUpdatedDate = momentJalaali(sp.updatedAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      sp.jalaaliUserFriendlyUpdatedDate = moment(sp.updatedAt).fromNow();
      sp.jalaaliFullUserFriendlyUpdatedDate = sp.jalaaliUpdatedDate + ' ' + moment(sp.updatedAt).fromNow();
    }
    finalData.dataLength = dataLength.length;
    finalData.data = allShoppingPlans;
    return finalData;
  }


};
