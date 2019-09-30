var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {

  friendlyName: 'Findone',

  description: 'Findone sciencechallenge.',

  inputs: {

    id :{
      type: 'string'
    }, 

    userId :{
      type: 'string'
    }

  },

  exits: {

  },

  fn: async function (inputs) {

    let summary = await Sciencechallenge.findOne({
      id: inputs.id
    });
    
    let isUserAnswered = await Sciencechallengeresponse.findOne({
      sciencechallengeId : inputs.id,
      userId: inputs.userId
    });

    if (typeof isUserAnswered === 'object' && isUserAnswered.constructor === Object) {
      isUserAnswered = isUserAnswered;
    } else {
      isUserAnswered = false;
    }
    // find video status for this user
    let userVideoStatus = await Watchedvideos.findOne({
      // userId : '5d73564134abe01014969d96',
      modelId: inputs.id,
    });

    if (userVideoStatus && typeof userVideoStatus === 'object' && userVideoStatus.constructor === Object)
      summary.startTime = userVideoStatus.startTime;

    summary.videoAddress = 'http://localhost:1337/files/sciencechallengeFiles/' + summary.mainFileSrc;
    moment.locale('en');
    summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    moment.locale('fa');
    summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
    summary.thumbnail = "http://localhost:1337/files/sciencechallengeImage/" + summary.thumbnail;

    return ({
      id: inputs.id,
      summary,
      thumbnail: summary.thumbnail,
      isUserAnswered: isUserAnswered
    });

  }

};
