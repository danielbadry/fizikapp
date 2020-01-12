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
    if (this.req.headers.authorization) {
      let token = this.req.headers.authorization;
      let TokenArray = token.split(' ');

      return jwt.verify(TokenArray[1], sails.config.custom.secret, async (err, decoded) => {
        if (err) {
          if(inputs.type === 'view')
          {
            let check = await Likedislikeview.find({
              model: inputs.model,
              modelId: inputs.modelId,
              type: inputs.type,
              userId: null,
            });
            if(check.length === 0) {
              return await Likedislikeview.create({
                model: inputs.model,
                modelId: inputs.modelId,
                type: inputs.type,
                userId: null,
                createdAt : await sails.helpers.dateParse(),
                updatedAt : await sails.helpers.dateParse()
              }).fetch();
            }
          }
        } else {
          let userId = decoded.id;

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
            let check = await Likedislikeview.find({
              model: inputs.model,
              modelId: inputs.modelId,
              type: inputs.type,
              userId: userId,
            });
            // return {res:check.length};
            if(check.length === 0) {
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
        }
      });

    } else {
      if (inputs.type === 'view')
      {
        return await Likedislikeview.create({
          model: inputs.model,
          modelId: inputs.modelId,
          type: inputs.type,
          userId: null,
          createdAt : await sails.helpers.dateParse(),
          updatedAt : await sails.helpers.dateParse()
        }).fetch();
      }
    }

  }
};
