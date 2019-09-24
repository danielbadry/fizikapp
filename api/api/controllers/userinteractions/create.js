module.exports = {


  friendlyName: 'Create',


  description: 'Create userinteraction',


  inputs: {

    message: {
      type: 'string'
    },
    
    parentId: {
      type: 'string'
    },
    
    modelId: {
      type: 'string'
    },
    
    model: {
      type: 'string'
    },
    
    userId: {
      type: 'string'
    },

    type: {
      type: 'string'
    }
    
  },


  exits: {

  },


  fn: async function (inputs) {
    
    return await Userinteractions.create({
      message: inputs.message,
      parentId: inputs.parentId,
      modelId: inputs.modelId,
      model: inputs.model,
      type: inputs.type,
      userId: inputs.userId,
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse()
    }).fetch();

  }


};
