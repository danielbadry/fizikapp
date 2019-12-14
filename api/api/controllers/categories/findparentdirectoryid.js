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
    let definition = await Definitions.findOne({
      id: inputs.rowId
    });

    let allCategories = await Categories.find();

    let pIds = [];
    let currentCat = definition.category;

    for (let i = 0; i < 10; i++) {
      for (let c of allCategories) {
        if (c.id === currentCat) {
          currentCat = c.parentId;
          let temp = {
            id: c.id,
            name: c.name
          }
          pIds.push(temp);
        }
      }
    }
    let finalData = {};
    finalData.data = [{
      p : pIds[2]
    }];
    return finalData;
  }

};
