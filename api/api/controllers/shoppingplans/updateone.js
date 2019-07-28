module.exports = {


  friendlyName: 'Updateone',


  description: 'Updateone shoppingplans.',


  inputs: {
    id :{
      type: 'string',
      required : false
    },
    
    type :{
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
    
    isDeleted :{
      type: 'boolean',
      required : false
    },
  },


  exits: {

  },


  fn: async function (inputs) {

    return 'milad';
    let result = await Shoppingplans.updateOne({
      id: inputs.id,
      isDeleted: false
    })
    .set({
        type: inputs.type
    });

    return result;

  }


};
