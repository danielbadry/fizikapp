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
    
    for (let shop of allShops) {
      let user = await Users.find({
        where : {
          id : shop.userId
        }
      });
      shop.userInfo = user[0];
      shop.userInfo.fullName = shop.userInfo.firstName + ' ' + shop.userInfo.lastName;
      shop.thumbnail = "http://localhost:1337/uploads/" + shop.userInfo.thumbnail;
      let shoppingPlanName = await Shoppingplans.find({
        id : shop.shoppingPlanId
      });
      shoppingPlanName = shoppingPlanName[0];
      shop.type = shoppingPlanName.type;
      shop.price = shoppingPlanName.secondPrise;
      moment.locale('en');
      shop.jalaaliCreatedDate = momentJalaali(shop.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      shop.jalaaliUserFriendlyCreatedDate = moment(shop.createdAt).fromNow();
    }

    return allShops;

  }


};
