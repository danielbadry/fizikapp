var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Userwatched',


  description: 'Userwatched watchedvideos.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let userwatched = await Watchedvideos.find();
    for (let uw of userwatched) {
      
      moment.locale('en');
      uw.jalaaliCreatedDate = momentJalaali(uw.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      uw.jalaaliUserFriendlyCreatedDate = moment(uw.createdAt).fromNow();

      // find user
      let user = await Users.find({
        where : {
          id : uw.userId
        }
      });
      
      // find product
      let product = await Products.find({
        where: {
          id: uw.productId
        }
      });

      uw.userInfo = user[0];
      uw.productInfo = product[0];
    }

    return userwatched;
  }

};
