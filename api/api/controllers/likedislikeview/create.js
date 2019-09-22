module.exports = {


  friendlyName: 'Create',


  description: 'Create likedislikeview.',


  inputs: {

    model : {
      type: 'string'
    },
    
    modelId : {
      type: 'string'
    },
    
    type : {
      type: 'string'
    },
    
    userId : {
      type: 'string'
    },

  },

  exits: {

  },

  fn: async function (inputs) {

    let check = await Likedislikeview.find({
      where : {
        model : inputs.model,
        modelId : inputs.modelId,
        type : inputs.type,
        userId : inputs.userId
      }
    });

    if (check.length) {
      await Likedislikeview.destroyOne({
        where : {
          model : inputs.model,
          modelId : inputs.modelId,
          type : inputs.type,
          userId : inputs.userId
        }
      });
      return {};
    } else {
      return await Likedislikeview.create({
        model: inputs.model,
        modelId: inputs.modelId,
        type: inputs.type,
        userId: inputs.userId,
        createdAt : await sails.helpers.dateParse(),
        updatedAt : await sails.helpers.dateParse()
      }).fetch();
    }
  }

};
