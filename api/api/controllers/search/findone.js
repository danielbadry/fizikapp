module.exports = {


  friendlyName: 'Findone',


  description: 'Findone search.',


  inputs: {
    searchterm: {
      type: 'string'
    },
  },


  exits: {

  },


  fn: async function (inputs) {

    let allProducts = await Products.find({
      or : [
        {
          name:{contains: inputs.searchterm}
        },
        {
          title:{contains: inputs.searchterm}
        },
        {
          description:{contains: inputs.searchterm}
        }
      ]
    });

    let allDefinitions = await Definitions.find({
      or : [
        {
          title:{contains: inputs.searchterm}
        },
        {
          name:{contains: inputs.searchterm}
        },
        {
          description:{contains: inputs.searchterm}
        }
      ]
    });

    let data = {};
    data.allProducts = allProducts;
    data.allDefinitions = allDefinitions;

    return data;

  }


};
