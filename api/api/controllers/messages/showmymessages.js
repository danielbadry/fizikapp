var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Showmymessages',


  description: 'Showmymessages messages.',


  inputs: {

  },


  exits: {

  },

  fn: async function (inputs) {

    let token = this.req.headers.authorization;
    let TokenArray = token.split(' ');
    return jwt.verify(TokenArray[1], sails.config.custom.secret, async (err, decoded) => {
      if (err) {
        return({ auth: false, token: null, errorMessage:'error in messages', err:err });
      } else {
        let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
        let userId = decodedToken.id;
        let messages = await Messages.find({
          where : {
            userId: userId
          }
        });
        return ({ auth: true, errorMessage:null, data:messages });
      }
    });

  }

};
