module.exports = {


  friendlyName: 'Findbymobile',


  description: 'Findbymobile users.',


  inputs: {

    mobile: {
      type: 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    let user = await Users.find({
      mobile: inputs.mobile
    });
    return user[0];

  }


};
