var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Financehistory',


  description: 'Financehistory users.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let indx = inputs.userId;
    if (!inputs.userId) {
      let token = this.req.headers.authorization;
      let TokenArray = token.split(" ");
      let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
      let userId = decodedToken.id;
      indx = userId;
    }

    let shops = await Shops.find({
      userId : indx
    });

    let shoppingplans = await Shoppingplans.find();

    for (let i = 0; i< shops.length; i++) {
      for (let j = 0; j < shoppingplans.length; j++) {
        if (shops[i].shoppingPlanId === shoppingplans[j].id) {
          shops[i].shoppingPlanName = shoppingplans[j].type;
          shops[i].shoppingPlanFirstPrise = shoppingplans[j].firstPrise;
          shops[i].shoppingPlanSecondPrise = shoppingplans[j].secondPrise;
        }
      }
    }

    return shops;

  }


};
