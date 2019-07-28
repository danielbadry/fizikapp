var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Find',


  description: 'Find shoppingplans.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let allShoppingPlans = await Shoppingplans.find();
    for (let sp of allShoppingPlans) { 
      moment.locale('en');
      sp.jalaaliUpdatedDate = momentJalaali(sp.updatedAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      sp.jalaaliUserFriendlyUpdatedDate = moment(sp.updatedAt).fromNow();
      sp.jalaaliFullUserFriendlyUpdatedDate = sp.jalaaliUpdatedDate + ' ' + moment(sp.updatedAt).fromNow();
    }

    return allShoppingPlans;
  }


};
