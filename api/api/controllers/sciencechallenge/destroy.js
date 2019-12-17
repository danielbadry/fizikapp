module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy sciencechallenge.',


  inputs: {

    id:{
      type: 'string'
    }
    
  },


  exits: {

  },


  fn: async function (inputs) {

    await Sciencechallenge.destroy({
      id: inputs.id
    }).fetch();

  }


};
