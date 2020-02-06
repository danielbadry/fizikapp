var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Listofonlinesinpercent',


  description: 'Listofonlinesinpercent users.',


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
          let users = await Users.find();
          allUsers = users.length;
          let offlineUsers = 0;
          for (user of users) {
            if (user.isOnline) {
              offlineUsers ++;
            }
          }

          let finalData = {};
          finalData.data = parseInt((offlineUsers * 100) / allUsers);
          finalData.dataLength = 1;
          finalData.auth = true;
          finalData.errorMessage = null;
          return finalData;
        }
      });

    }
  }

};
