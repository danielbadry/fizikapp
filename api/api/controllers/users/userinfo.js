var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Userinfo',


  description: 'Userinfo users.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let token = this.req.headers.authorization;
    let TokenArray = token.split(" ");
    let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
    let userId = decodedToken.id;

    let user = Users.findOne({
      where : {
        id: userId
      }
    });

    return user;

  }


};
