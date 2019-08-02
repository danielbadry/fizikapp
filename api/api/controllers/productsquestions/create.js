module.exports = {


  friendlyName: 'Create',


  description: 'Create productsquestions.',


  inputs: {
    message: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    
    return await Productsquestions.create({
      message: inputs.message,
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse()
    }).fetch();

  }


};
