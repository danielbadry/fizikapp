var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Showmysciencechalange',


  description: 'Showmysciencechalange sciencechallenge.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    if (this.req.headers.authorization) {
      let token = this.req.headers.authorization;
      let TokenArray = token.split(' ');
      return jwt.verify(TokenArray[1], sails.config.custom.secret, async (err, decoded) => {
        if (err) {

        } else {
          let myScienceChallengesResponse = await Sciencechallengeresponse.find({
            userId : decoded.userId
          });
          let sciencechallengeIds = [];
          for (msc of myScienceChallengesResponse) {
            sciencechallengeIds.push(msc.sciencechallengeId);
          }
          let myScienceChallenges = await Sciencechallenge.find({
            id: { in: sciencechallengeIds }
          });
          return ({ auth: true, errorMessage:null, data: myScienceChallenges });
        }
      });

    }

  }

};
