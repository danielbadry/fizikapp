var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Find',


  description: 'Find sciencechallenge.',

  inputs: {

    limit: {
      type: 'number'
    },
    
    skip: {
      type: 'number'
    },

    sort: {
      type: 'string'
    },
    
    where: {
      type: 'string'
    },
    
  },

  exits: {

  },


  fn: async function (inputs) {

    let finalData = {};
    
    let dataLength = await Sciencechallenge.find();
    let allSciencechallenges = await Sciencechallenge.find()
    .limit(inputs.limit)
    .skip(inputs.skip)
    ;

    for (let sciencechallenge of allSciencechallenges) {
      sciencechallenge.thumbnail = "http://localhost:1337/files/sciencechallengeImage/" + sciencechallenge.thumbnail;
      moment.locale('en');
      sciencechallenge.jalaaliCreatedDate = momentJalaali(sciencechallenge.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      sciencechallenge.jalaaliUpdatedDate = momentJalaali(sciencechallenge.updatedAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      sciencechallenge.jalaaliUserFriendlyCreatedDate = moment(sciencechallenge.createdAt).fromNow();
      sciencechallenge.jalaaliUserFriendlyUpdatedDate = moment(sciencechallenge.updatedAt).fromNow();
      sciencechallenge.jalaaliFullUserFriendlyCreatedDate = sciencechallenge.jalaaliCreatedDate + ' ' + sciencechallenge.jalaaliUserFriendlyCreatedDate;
    }

    finalData.dataLength = dataLength.length;
    finalData.data = allSciencechallenges;
    return finalData;

  }


};
