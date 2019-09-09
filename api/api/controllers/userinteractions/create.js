module.exports = {


  friendlyName: 'Create',


  description: 'Create productsquestions.',


  inputs: {
    message: {
      type: 'string'
    },
    
    parentId: {
      type: 'string'
    },
    
    productId: {
      type: 'string'
    }
    
  },


  exits: {

  },


  fn: async function (inputs) {
    
    return await Productsquestions.create({
      message: inputs.message,
      parentId: inputs.parentId,
      productId: inputs.productId,
      userId: null,
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse()
    }).fetch();

  }


};
