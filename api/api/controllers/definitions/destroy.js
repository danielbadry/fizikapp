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

    const path = sails.config.appPath + '/assets/files/definitionImage/' + inputs.id + '.jpg';
    try {
      fs.unlinkSync(path);
      var destroyedRecords = await Definitions.destroy({
        id: inputs.id
      }).fetch();
    } catch(err) {
      console.error(err);
    }

  }


};
