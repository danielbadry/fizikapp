var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Find',


  description: 'Find messages.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let token = this.req.headers.authorization;
    let TokenArray = token.split(" ");
    let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
    let userId = decodedToken.id;
    let messages = await Messages.find({
      userId: userId
    });
    return messages;
  }


};
