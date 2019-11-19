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

      let model = (eval(watchedvideo.model));
      let rec = await model.find({
        id:watchedvideo.modelId
      });
      
      // switch (rec.model) {
      //   case 'Products' :
      //     url = "/files/productImage/";
      //     break;
      //   case 'Sciencechallenge' :
      //     url = "/files/sciencechallengeImage/";
      //     break;
      //   case 'Beyondthebooks' :
      //     url = "/files/beyondthebooksImage/";
      //     break;
      // }
      rec.m = 'aaa';
      rec['thumbnail'] = null;//sails.config.custom.apiUrl + url + rec.thumbnail;
      watchedvideo.recordData = rec;
    }

    finalData.dataLength = watchedvideos.length;
    finalData.data = watchedvideos;
    return finalData;

  }


};
