var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Clearnotify',


  description: 'Clearnotify messages.',


  inputs: {

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
          let updatedUser = await Messages.update({
            userId: decoded.id
          })
          .set ({
            isRead : true,
          });
          let finalData = {};
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
