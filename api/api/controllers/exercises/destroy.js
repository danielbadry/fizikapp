const fs = require('fs');

module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy exercises.',


  inputs: {

    id:{
      type: 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    await Exercises.destroy({
      id: inputs.id
    }).fetch();

  }

};
