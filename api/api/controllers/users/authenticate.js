var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
module.exports = {


  friendlyName: 'Authenticate',


  description: 'Authenticate users.',


  inputs: {

    username: {
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
        userName : inputs.username
      }
    });
    // var passwordIsValid = await bcrypt.compareSync('12', user.password);
    // return (user.password);
    if(bcrypt.compareSync(inputs.password, user.password)) {
      var token = jwt.sign({ id: user.id }, sails.config.custom.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
    return({ auth: true, token: token });
    } else {
    return({ auth: false, token: null });
    }

  }

};
