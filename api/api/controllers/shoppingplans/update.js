module.exports = {


  friendlyName: 'Update',


  description: 'Update shoppingplans.',


  inputs: {

    type :{
      type: 'string',
      required : false
    },
    
    id :{
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
    
    secondPrise :{
      type: 'number',
      required : false
    },

  },


  exits: {

  },


  fn: async function (inputs) {
    let result = await Shoppingplans.updateOne({
      id: inputs.id
    })
    .set({
        type: inputs.type,
        duration: inputs.duration,
        firstPrise: inputs.firstPrise,
        secondPrise: inputs.secondPrise,
        updatedAt : await sails.helpers.dateParse()
    });

    return result;
    
  }


};
