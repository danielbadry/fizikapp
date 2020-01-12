module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy userinteractions.',


  inputs: {

    id:{
      type: 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    await Userinteractions.destroyOne({id: inputs.id});

  }


};
