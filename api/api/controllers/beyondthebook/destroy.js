const fs = require('fs');
module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy beyondthebook.',


  inputs: {

    id:{
      type: 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    /*
    TODO: we MUST DELETE image file and video file
    */
    // const path1 = sails.config.appPath + '/assets/files/productImage/' + inputs.id + '.jpg';
    // const path2 = sails.config.appPath + '/assets/files/productFiles/' + inputs.id + '.mp4';
    // try {
    //   fs.unlinkSync(path1);
    //   fs.unlinkSync(path2);
    //   var destroyedRecords = await Products.destroy({
    //     id: inputs.id
    //   }).fetch();
    // } catch(err) {
    //   console.error(err);
    // }
    await Beyondthebook.destroy({
      id: inputs.id
    }).fetch();
  }


};
