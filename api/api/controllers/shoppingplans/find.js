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
    let allShoppingPlans = await Shoppingplans.find({
      id: { nin: ['5e24e19701dcbf2e351142de'] }
    })
    .limit(inputs.limit)
    .skip(inputs.skip);
    for (let sp of allShoppingPlans) {
      moment.locale('en');
      sp.jalaaliUpdatedDate = momentJalaali(sp.updatedAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      sp.jalaaliUserFriendlyUpdatedDate = moment(sp.updatedAt).fromNow();
      sp.jalaaliFullUserFriendlyUpdatedDate = sp.jalaaliUpdatedDate + ' ' + moment(sp.updatedAt).fromNow();
      sp.thumbnail = sails.config.custom.apiUrl + '/files/shoppingplansImage/' + sp.thumbnail;
      sp.purchaseLink = sails.config.custom.baseUrl + '/#/shoppingplans/purchasefrommobile/' + sp.id;
    }
    finalData.dataLength = allShoppingPlans.length;
    finalData.data = allShoppingPlans;
    finalData.auth = true;
    return finalData;
  }


};
