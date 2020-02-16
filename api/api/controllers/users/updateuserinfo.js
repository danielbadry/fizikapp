var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Updateuserinfo',


  description: 'Updateuserinfo users.',


  inputs: {

    firstName :{
      type: 'string',
      required : false
    },
    
    isOnline :{
      type: 'boolean',
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
    
    thumbnail :{
      type: 'string',
      required : false
    },
    
  },


  exits: {

  },


  fn: async function (inputs) {
    let finalData = {};
    if (this.req.headers.authorization) {
      let token = this.req.headers.authorization;
      let TokenArray = token.split(' ');
      return jwt.verify(TokenArray[1], sails.config.custom.secret, async (err, decoded) => {
        if (err) {

        } else {
          let updatedUser = await Users.updateOne({
            id: decoded.id
          })
          .set ({
            firstName : inputs.firstName,
            lastName : inputs.lastName,
            email : inputs.email,
            thumbnail : inputs.thumbnail,
            isOnline : inputs.isOnline
          });
          // return updatedUser;
          finalData.dataLength = 1;
          finalData.data = updatedUser;
          finalData.auth = true;
          finalData.errorMessage = null;
          return finalData;
        }
      });

    }

  }
};
