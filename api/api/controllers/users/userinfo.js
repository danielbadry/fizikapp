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
    // return this.res.json(decodedToken);
    let userId = decodedToken.id;
    // return this.res.json(userId);
    let user = await Users.findOne({
      where : {
        id: userId
      }
    });

    return this.res.json(user);

  }


};
