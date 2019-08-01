module.exports = {


  friendlyName: 'Create',


  description: 'Create quizes.',


  inputs: {
    
    question :{
      type : 'string'
    },
    
    options :{
      type : 'string'
    },

    productId :{
      type : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    return await Quizes.create({
      question: inputs.question,
      productId: inputs.productId,
      options:[],
      createdAt : await sails.helpers.dateParse()
    }).fetch();

  }


};
