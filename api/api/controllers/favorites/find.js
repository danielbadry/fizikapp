var jwt = require('jsonwebtoken');
var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {

  friendlyName: 'Find',


  description: 'Find favorites.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    if (this.req.headers.authorization) {
      let token = this.req.headers.authorization;
      let TokenArray = token.split(' ');
      return jwt.verify(TokenArray[1], sails.config.custom.secret, async (err, decoded) => {
        if (err) {
          return ({ auth: false, errorMessage:null, data: null });
        } else {
          let myFavorites = await Favorites.find({
            userId : decoded.id
          });
          let favoritesIds = [];
          for (f of myFavorites) {
            favoritesIds.push(f.modelId);
          }
          let myProducts = await Products.find({
            id: { in: favoritesIds }
          });
          for (product of myProducts) {
            product.thumbnail = sails.config.custom.apiUrl + "/files/productImage/" + product.thumbnail;
            moment.locale('en');
            product.jalaaliCreatedDate = momentJalaali(product.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
            moment.locale('fa');
            product.jalaaliUserFriendlyCreatedDate = moment(product.createdAt).fromNow();
            product.jalaaliFullUserFriendlyCreatedDate = product.jalaaliCreatedDate + ' ' + product.jalaaliUserFriendlyCreatedDate;
          }
          return ({ auth: true, errorMessage:null, data: myProducts });
        }
      });

    } else {
      return ({ auth: false, errorMessage:null, data: null });
    }
  }

};
