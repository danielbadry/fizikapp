module.exports = {


  friendlyName: 'Errorlist',


  description: 'Errorlist users.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return {
      100 : 'user already exists',
      101 : 'email not valid'
    };

  }


};
