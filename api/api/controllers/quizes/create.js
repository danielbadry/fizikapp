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

    modelId :{
      type : 'string'
    },
    
    model :{
      type : 'string'
    },
    
    isOpen :{
      type : 'boolean',
      defaultsTo: true
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    return await Quizes.create({
      question: inputs.question,
      modelId: inputs.productId,
      model: inputs.model,
      options:[],
      createdAt : await sails.helpers.dateParse()
    }).fetch();

  }


};
