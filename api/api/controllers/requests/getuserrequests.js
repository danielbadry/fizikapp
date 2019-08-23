module.exports = {


  friendlyName: 'Getuserrequests',


  description: 'Getuserrequests requests.',


  inputs: {

    userId: {
      type: 'string'
    },
    
  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return 'hello user requests';

  }


};
