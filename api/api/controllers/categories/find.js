module.exports = {


  friendlyName: 'Find',


  description: 'Find categories.',


  inputs: {
    rowId: {
      type: 'string',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs) {

    // All done.
    return Categories.find({
      where: {
        parentId:inputs.rowId,
        isDeleted: false
      }
    });

  }


};
