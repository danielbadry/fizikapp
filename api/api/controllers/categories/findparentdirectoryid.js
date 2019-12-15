module.exports = {


  friendlyName: 'Find parent directory id',


  description: '',


  inputs: {
    
    rowId: {
      type: 'string',
      required: false
    },
    
    model: {
      type: 'string',
      required: false
    },

  },


  exits: {

  },


  fn: async function (inputs) {
    let entitie = {};
    switch (inputs.model) {
      case 'products' :
        
        entitie = await Products.findOne({
          id: inputs.rowId
        });
        // return entitie;
      break;
      case 'definitions' :
        entitie = await Definitions.findOne({
          id: inputs.rowId
        });
      break;
    }

    // return entitie;

    let allCategories = await Categories.find();

    let pIds = [];
    let currentCat = entitie.category;
    // return currentCat;
    for (let i = 0; i < 10; i++) {
      for (let c of allCategories) {
        if (c.id === currentCat) {
          currentCat = c.parentId;
          let temp = {
            id: c.id,
            name: c.name,
            parentId: c.parentId,
          };
          pIds.push(temp);
        }
      }
    }

    // return pIds;
    let finalData = {};
    finalData.data = [{
      p : pIds[pIds.length - 2]
    }];

    // return 
    // for (let pid of pIds) {
    //   if (pid.parentId === '0') {
    //     finalData.data[0].p = pid; 
    //   }
    // }

    return finalData;
  }

};
