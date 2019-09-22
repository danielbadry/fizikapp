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
    
    let allDisLikes = await Likedislikeview.find({
      where :{
        model: inputs.model,
        modelId: inputs.modelId,
        type:'dislike'
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
        data : allLikes
      },
      disLikes : {
        count : allDisLikes.length,
        data : allLikes
      },
      views : {
        count : allViews.length,
        data : allLikes
      }
    }
    
    return (result);

  }

};
