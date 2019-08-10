module.exports = {


  friendlyName: 'Find parent directory id',


  description: '',


  inputs: {
    
    rowId: {
      type: 'string',
      required: false
    },

  },


  exits: {

  },


  fn: async function (inputs) {

    let allItems = await Categories.find({
      where: {
        id:inputs.rowId,
        isDeleted: false
      }
    });

    return allItems[0];

  }

};
