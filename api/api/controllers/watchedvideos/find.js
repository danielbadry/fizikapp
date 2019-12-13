var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Find',


  description: 'Find watchedvideos.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    let finalData = {};
    let url;
    let token = this.req.headers.authorization;
    let TokenArray = token.split(" ");
    let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
    let userId = decodedToken.id;

    let watchedvideos = await Watchedvideos.find({
      userId: userId
    });

    for (let watchedvideo of watchedvideos) {
      
      let model = eval(watchedvideo.model[0].toUpperCase() + watchedvideo.model.slice(1));
      let allViews = 0;
      let allLikes = 0;
      let allDislikes = 0;
      let likedislikeviews = await Likedislikeview.find({
        modelId: watchedvideo.modelId,
        model: watchedvideo.model
      });
      for (let ldv of likedislikeviews) {
        if (ldv.type === 'view') {
          allViews ++;
        } else if (ldv.type === 'like') {
          allLikes ++;
        } else if (ldv.type === 'dislike') {
          allDislikes ++;
        }
      }
      watchedvideo.views = allViews;
      watchedvideo.likes = allLikes;
      watchedvideo.dislikes = allDislikes;
      switch (watchedvideo.model[0].toUpperCase() + watchedvideo.model.slice(1)) {
        case 'Products' :
          url = "/files/productImage/";
          break;
        case 'Sciencechallenge' :
          url = "/files/sciencechallengeImage/";
          break;
        case 'Beyondthebooks' :
          url = "/files/beyondthebooksImage/";
          break;
      }
      let info = await model.findOne({
        id: watchedvideo.modelId
      });
      watchedvideo.name = info.name;
      watchedvideo.title = info.title;
      watchedvideo.description = info.description;
      watchedvideo.thumbnail = sails.config.custom.apiUrl + url + watchedvideo.thumbnail;
    }

    finalData.dataLength = watchedvideos.length;
    finalData.data = watchedvideos;
    return finalData;

  }


};
