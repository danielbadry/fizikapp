var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Sendinvitation',


  description: 'Sendinvitation users.',


  inputs: {
    email :{
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    if (this.req.headers.authorization) {
      let token = this.req.headers.authorization;
      let TokenArray = token.split(' ');
      return jwt.verify(TokenArray[1], sails.config.custom.secret, async (err, decoded) => {
        if (err) {

        } else {
          let data = decoded.id;
          let buff = new Buffer(data);
          let base64data = buff.toString('base64');
          let inviteString = 'http://localhost:3001/#/signup?decstr=';
          return (inviteString + base64data);
        }
      });

    }

  }

};
