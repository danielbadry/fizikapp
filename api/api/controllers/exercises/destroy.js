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

    const path = sails.config.appPath + '/assets/files/exerciseImage/' + inputs.id + '.jpg';
    try {
      fs.unlinkSync(path);
      var destroyedRecords = await Exercises.destroy({
        id: inputs.id
      }).fetch();
    } catch(err) {
      console.error(err);
    }

  }

};
