var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Setuseroffline',


  description: 'Setuseroffline users.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let token = this.req.headers.authorization;
    let TokenArray = token.split(' ');
    let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
    let userId = decodedToken.id;

    // set isOnline flag on USERS model
    await Users.updateOne({
      id: userId
    }).set({
      isOnline : false
    });
    return ({ auth: true, errorMessage:null, data:[] });

  }


};
