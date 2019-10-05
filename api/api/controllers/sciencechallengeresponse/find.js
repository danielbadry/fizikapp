var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Find',


  description: 'Find sciencechallengeresponse.',


  inputs: {
    sciencechallengeid  :{
      type : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let finalData = {};
    let dataLength = await Sciencechallengeresponse.find();

    let allSciencechallengeresponse = await Sciencechallengeresponse.find({
      where : {
        sciencechallengeId : inputs.sciencechallengeid
      }
    })
    .limit(inputs.limit)
    .skip(inputs.skip)
    ;
    for (let sciencechallengeresponse of allSciencechallengeresponse) {
      moment.locale('en');
      sciencechallengeresponse.jalaaliCreatedDate = momentJalaali(sciencechallengeresponse.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      sciencechallengeresponse.jalaaliUserFriendlyCreatedDate = moment(sciencechallengeresponse.createdAt).fromNow();
    
      sciencechallengeresponse.userinfo = await Users.findOne({
        id : sciencechallengeresponse.userId
      });
    }
    finalData.dataLength = dataLength.length;
    finalData.data = allSciencechallengeresponse;
    return finalData;

  }


};
