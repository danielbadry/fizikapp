const fs = require('fs');
module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy definitions.',


  inputs: {

    id:{
      type: 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    await Definitions.destroyOne({id: inputs.id});

  }


};
