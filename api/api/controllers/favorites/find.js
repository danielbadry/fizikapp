module.exports = {


  friendlyName: 'Find',


  description: 'Find favorites.',


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

    let favorites = await Favorites.find({
      userId: userId
    });

    for (let favorite of favorites) {

      let model = (eval(favorite.model));
      let rec = await model.find({
        id:favorite.modelId
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
      favorite.recordData = rec;
    }

    finalData.dataLength = favorites.length;
    finalData.data = favorites;
    return finalData;

  }


};
