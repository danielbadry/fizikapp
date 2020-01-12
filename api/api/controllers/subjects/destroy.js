module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy subjects.',


  inputs: {

    id:{
      type: 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    await Subjects.destroyOne({id: inputs.id});

  }


};
