var bcrypt = require('bcryptjs');
module.exports = {


  friendlyName: 'Update',


  description: 'Update users.',


  inputs: {
    id:{
      type:'string'
    },
    firstName:{
      type:'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(this.req.param('password'), salt);
    var updatedUser = await Users.updateOne({ 
      id: inputs.id
    })
    .set({
      password:hash,
      firstName:inputs.firstName,
      lastName:inputs.lastName
    });

    return updatedUser;
  }


};
