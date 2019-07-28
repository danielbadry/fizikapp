module.exports = {


  friendlyName: 'Create',


  description: 'Create shoppingplans.',


  inputs: {
    
    type: {
      type: 'string'
    },

    duration :{
      type: 'number',
    },
    
    firstPrise :{
      type: 'number',
    },
    
    secondPrise :{
      type: 'number',
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
      type : inputs.type
    }).fetch();

  }


};
