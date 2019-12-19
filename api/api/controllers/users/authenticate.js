var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
module.exports = {


  friendlyName: 'Authenticate',


  description: 'Authenticate users.',


  inputs: {

    mobile: {
      type: 'string'
    },

    password: {
      type: 'string'
    },

  },


  exits: {

  },


  fn: async function (inputs) {

    let user = await Users.findOne({
      where : {
        mobile : inputs.mobile
      }
    });
    
    if ( typeof(user) !== 'undefined' && typeof(user) === 'object'){
      if(bcrypt.compareSync(inputs.password, user.password)) {
        var token = jwt.sign({ id: user.id }, sails.config.custom.secret, {
          expiresIn: 259200 // expires in 72 hours
        });
      return({
          auth: true,
          token: token,
          userinfo:{
            firstName:user.firstName,
            userName:user.userName,
            lastName:user.lastName,
            thumbnail:user.thumbnail,
            isAdmin:user.isAdmin
          }
        });
      } else {
      return({ auth: false, token: null });
      }
    } else {
      return({ auth: false, token: null, errorMessage:'not a user' });
    }

  }

};
