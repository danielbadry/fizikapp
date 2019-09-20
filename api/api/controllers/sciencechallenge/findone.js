var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Findone',


  description: 'Findone sciencechallenge.',


  inputs: {

    id :{
      type: 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    let summary = await Sciencechallenge.findOne({
      id: inputs.id
    });
    
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
    let sciencechallengeQuestions = await Userinteractions.find({
        where : {
          isDeleted : false,
          modelId: inputs.id,
          type:'qa',
          model: 'sciencechallenges'
        }
    });

    for (let sciencechallengeQuestion of sciencechallengeQuestions) {
      moment.locale('en');
      sciencechallengeQuestion.jalaaliCreatedDate = momentJalaali(sciencechallengeQuestion.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      sciencechallengeQuestion.jalaaliUserFriendlyCreatedDate = moment(sciencechallengeQuestion.createdAt).fromNow();

      if (sciencechallengeQuestion.userId) {
        let user = await Users.find({
          where : {
            id: sciencechallengeQuestion.userId
          }
        });
        sciencechallengeQuestion.userInfo = user[0];
        sciencechallengeQuestion.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + sciencechallengeQuestion.userInfo.thumbnail;
        sciencechallengeQuestion.userInfo.url = 'http://localhost:3000/#/users/' + sciencechallengeQuestion.userInfo.id + '/show';
      } else {
        sciencechallengeQuestion.userInfo = {};
        sciencechallengeQuestion.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + '5d3c66fc823c3d1be8f529d3.jpg';
        sciencechallengeQuestion.userInfo.firstName = 'iman';
        sciencechallengeQuestion.userInfo.lastName = 'arghamy';
      }
      
    }

    let sciencechallengeComments = await Userinteractions.find({
      where : {
        isDeleted : false,
        modelId: inputs.id,
        type:'comment',
        model: 'sciencechallenges'
      }
    });

    for (let sciencechallengeComment of sciencechallengeComments) {
      moment.locale('en');
      sciencechallengeComment.jalaaliCreatedDate = momentJalaali(sciencechallengeComment.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      sciencechallengeComment.jalaaliUserFriendlyCreatedDate = moment(sciencechallengeComment.createdAt).fromNow();

      if (sciencechallengeComment.userId) {
        let user = await Users.find({
          where : {
            id: sciencechallengeComment.userId
          }
        });
        sciencechallengeComment.userInfo = user[0];
        sciencechallengeComment.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + sciencechallengeComment.userInfo.thumbnail;
        sciencechallengeComment.userInfo.url = 'http://localhost:3000/#/users/' + sciencechallengeComment.userInfo.id + '/show';
      } else {
        sciencechallengeComment.userInfo = {};
        sciencechallengeComment.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + 'IMG_20190804_103448_895.jpg';
        sciencechallengeComment.userInfo.firstName = 'iman';
        sciencechallengeComment.userInfo.lastName = 'arghamy';
      }
      
    }
    summary.thumbnail = "http://localhost:1337/files/sciencechallengeImage/" + summary.thumbnail;

    return ({
      id: inputs.id,
      summary,
      sciencechallengeQuestions,
      sciencechallengeComments,
      thumbnail: summary.thumbnail
    });

  }


};
