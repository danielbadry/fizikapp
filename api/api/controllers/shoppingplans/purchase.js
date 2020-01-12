var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Purchase',


  description: 'Purchase shoppingplans.',


  inputs: {

    shoppingplanId :{
      type: 'string',
    },

  },


  exits: {

  },


  fn: async function (inputs) {
    let finalData = {};
    let token = this.req.headers.authorization;
    let TokenArray = token.split(" ");
    let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
    let userId = decodedToken.id;

    let user = await Users.findOne({
      id: userId
    });

    let shoppingPlan = await Shoppingplans.findOne({
      id : '5e1332017901ed18d8168a24'
    });

    let fCoin = parseInt(user.fCoin) - parseInt(shoppingPlan.fPointPrice);

    await Users.updateOne({
      id: userId
    })
    .set({
      fCoin : fCoin
    });

    let shops = await Shops.create({
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse(),
      userId: userId,
      shoppingPlanId : '5e1332017901ed18d8168a24',
      source : 'fCoin'
    }).fetch();

    finalData.dataLength = 1;
    finalData.data = {
      createdAt : shops.createdAt,
      result : {
        message : 'با موفقیت خرید انجام شد'
      }
    };
    finalData.auth = true;
    return finalData;

  }

};
