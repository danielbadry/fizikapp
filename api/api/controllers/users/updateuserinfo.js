var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Updateuserinfo',


  description: 'Updateuserinfo users.',


  inputs: {
    firstName :{
      type: 'string',
      required : false
    },
    
    lastName :{
      type: 'string',
      required : false
    },
    
    email :{
      type: 'string',
      required : false
    },
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
          await Users.updateOne({
            id: decoded.id
          })
          .set ({
            firstName : inputs.firstName,
            lastName : inputs.lastName,
            email : inputs.email
          });
        }
      });

    }

  }


};
