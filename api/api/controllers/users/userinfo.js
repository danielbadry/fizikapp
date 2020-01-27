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
    let TokenArray = token.split(' ');
    return jwt.verify(TokenArray[1], sails.config.custom.secret, async (err, decoded) => {
      if (err) {
        return({ auth: false, token: null, errorMessage:'not a user', err:err });
      } else {
        let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
        let userId = decodedToken.id;
        let user = await Users.findOne({
          where : {
            id: userId
          }
        });
        if(user.thumbnail !== '') {
          user.thumbnail = sails.config.custom.apiUrl + '/files/usersImage/' + user.thumbnail;
        } else {
          user.thumbnail = sails.config.custom.apiUrl + '/files/usersImage/' + 'unknown.png';
        }
        // user.thumbnail = sails.config.custom.apiUrl + "/files/usersImage/" + user.thumbnail;
        return ({ auth: true, errorMessage:null, userinfo : user, data:user });
      }
    });
  }

};
