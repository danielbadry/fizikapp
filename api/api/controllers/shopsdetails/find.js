module.exports = {


  friendlyName: 'Find',


  description: 'Find shopsdetails.',


  inputs: {
    shopId: {
      type: 'string',
      required: true
    },
    productId: {
      type: 'string',
      required: true
    },
  },


  exits: {

  },


  fn: async function (inputs) {

    return (inputs.shopId);

  }

};
