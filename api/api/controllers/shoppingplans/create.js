module.exports = {


  friendlyName: 'Create',


  description: 'Create shoppingplans.',


  inputs: {
    
    type: {
      type: 'string',
      required : false
    },
    
    thumbnail: {
      type: 'string',
      required : false
    },

    duration :{
      type: 'number',
      required : false
    },
    
    firstPrise :{
      type: 'number',
      required : false
    },
    
    fPointPrice :{
      type: 'string',
      required : false
    },
    
    secondPrise :{
      type: 'number',
      required : false
    },
  },


  exits: {

  },


  fn: async function (inputs) {

    return await Shoppingplans.create({
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse(),
      duration : inputs.duration,
      firstPrise : inputs.firstPrise,
      secondPrise : inputs.secondPrise,
      fPointPrice : inputs.fPointPrice,
      thumbnail : inputs.thumbnail,
      type : inputs.type
    }).fetch();

  }


};
