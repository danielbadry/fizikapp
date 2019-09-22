module.exports = {

  friendlyName: 'Find',

  description: 'Find likedislikeview.',

  inputs: {

    model: {
      type: 'string'
    },
    
    modelId: {
      type: 'string'
    },

  },

  exits: {

  },

  fn: async function (inputs) {

    let allLikes = await Likedislikeview.find({
      where :{
        model: inputs.model,
        modelId: inputs.modelId,
        type:'like'
      }
    });
    
    let youLiked = await Likedislikeview.find({
      where :{
        model: inputs.model,
        modelId: inputs.modelId,
        type:'like',
        userId: inputs.userId
      }
    });

    let allDisLikes = await Likedislikeview.find({
      where :{
        model: inputs.model,
        modelId: inputs.modelId,
        type:'dislike'
      }
    });

    let youDisLiked = await Likedislikeview.find({
      where :{
        model: inputs.model,
        modelId: inputs.modelId,
        type:'dislike',
        userId: inputs.userId
      }
    });
    
    let allViews = await Likedislikeview.find({
      where :{
        model: inputs.model,
        modelId: inputs.modelId,
        type:'view'
      }
    });

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
    }
    
    return (result);

  }

};
