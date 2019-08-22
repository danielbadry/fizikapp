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

    return allProducts;

  }


};
