var jwt = require('jsonwebtoken');
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
    let token = this.req.headers.authorization;
    let TokenArray = token.split(" ");
    let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
    let userId = decodedToken.id;

    let check = await Likedislikeview.find({
      where : {
        model : inputs.model,
        modelId : inputs.modelId,
        type : inputs.type,
        userId : userId
      }
    });

    if (check.length && inputs.type !== 'view') {
      await Likedislikeview.destroyOne({
        where : {
          model : inputs.model,
          modelId : inputs.modelId,
          type : inputs.type,
          userId : userId
        }
      });
      return {};
    } else {
      return await Likedislikeview.create({
        model: inputs.model,
        modelId: inputs.modelId,
        type: inputs.type,
        userId: userId,
        createdAt : await sails.helpers.dateParse(),
        updatedAt : await sails.helpers.dateParse()
      }).fetch();
    }
  }

};
