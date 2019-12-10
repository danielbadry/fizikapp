var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Purchase',


  description: 'Purchase shoppingplans.',


  inputs: {

    price :{
      type: 'number',
    },

  },


  exits: {

  },


  fn: async function (inputs) {

    let token = this.req.headers.authorization;
    let TokenArray = token.split(" ");
    let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
    let userId = decodedToken.id;

    let user = await Users.findOne({
      id: userId
    });

    let fCoin = parseInt(user.fCoin) - parseInt(inputs.price);

    await Users.updateOne({
      id: userId
    })
    .set({
      fCoin : fCoin
    });

  }


};
