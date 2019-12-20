var jwt = require('jsonwebtoken');
module.exports = {

  friendlyName: 'Find',

  description: 'Find likedislikeview.',

  inputs: {

    model: {
      type: 'string'
    },

    modelid: {
      type: 'string'
    },

  },

  exits: {

  },

  fn: async function (inputs) {
    if (this.req.headers.authorization) {
      let token = this.req.headers.authorization;
      let TokenArray = token.split(" ");
      return jwt.verify(TokenArray[1], sails.config.custom.secret, async (err, decoded) => {
        if (err) {
  
          let allLikes = await Likedislikeview.find(
            {
              model: inputs.model,
              modelId: inputs.modelid,
              type:'like'
            }
          );
  
          let allDisLikes = await Likedislikeview.find(
            {
              model: inputs.model,
              modelId: inputs.modelid,
              type:'dislike'
            }
          );
  
          let allViews = await Likedislikeview.find(
              {
                model: inputs.model,
                modelId: inputs.modelid,
                type:'view'
              }
          );
  
          let result = {
            likes : {
              count : allLikes.length,
              data : allLikes,
              youLike : false
            },
            disLikes : {
              count : allDisLikes.length,
              data : allLikes,
              youDisLike : false
            },
            views : {
              count : allViews.length,
              data : allLikes
            }
          };
  
          return (result);
        } else {
          let userId = decoded.id;
  
          let allLikes = await Likedislikeview.find(
            {
              model: inputs.model,
              modelId: inputs.modelid,
              type:'like'
            }
          );
  
          let youLiked = await Likedislikeview.find(
            {
              model: inputs.model,
              modelId: inputs.modelid,
              type:'like',
              userId: userId
            }
          );
  
          let allDisLikes = await Likedislikeview.find(
            {
              model: inputs.model,
              modelId: inputs.modelid,
              type:'dislike'
            }
          );
  
          let youDisLiked = await Likedislikeview.find(
            {
              model: inputs.model,
              modelId: inputs.modelid,
              type:'dislike',
              userId: userId
            }
          );
  
          let allViews = await Likedislikeview.find(
            {
              model: inputs.model,
              modelId: inputs.modelid,
              type:'view'
            }
          );
  
          let result = {
            likes : {
              count : allLikes.length,
              data : allLikes,
              youLike : (youLiked.length ? true : false)
            },
            disLikes : {
              count : allDisLikes.length,
              data : allLikes,
              youDisLike : (youDisLiked.length ? true : false)
            },
            views : {
              count : allViews.length,
              data : allLikes
            }
          };

          return (result);
        }
      });
    } else {
      let allLikes = await Likedislikeview.find(
        {
          model: inputs.model,
          modelId: inputs.modelid,
          type:'like'
        }
      );

      let allDisLikes = await Likedislikeview.find(
        {
          model: inputs.model,
          modelId: inputs.modelid,
          type:'dislike'
        }
      );

      let allViews = await Likedislikeview.find(
          {
            model: inputs.model,
            modelId: inputs.modelid,
            type:'view'
          }
      );

      let result = {
        likes : {
          count : allLikes.length,
          data : allLikes,
          youLike : false
        },
        disLikes : {
          count : allDisLikes.length,
          data : allLikes,
          youDisLike : false
        },
        views : {
          count : allViews.length,
          data : allLikes
        }
      };

      return (result);
    }
  }

};
