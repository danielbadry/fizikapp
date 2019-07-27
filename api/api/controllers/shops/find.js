var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Find',


  description: 'Find shops.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let allShops = await Shops.find();
    
    for (let shops of allShops) { 
      shops.thumbnail = "http://localhost:1337/uploads/" + shops.thumbnail;
      moment.locale('en');
      shops.jalaaliCreatedDate = momentJalaali(shops.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      shops.jalaaliUserFriendlyCreatedDate = moment(shops.createdAt).fromNow();
    }

    return allShops;

  }


};
