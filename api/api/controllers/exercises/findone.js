var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Findone',


  description: 'Findone exercises.',


  inputs: {

    id :{
      type: 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    let tagsArray = [];
    let summary = await Exercises.findOne({
      id: inputs.id
    });

    moment.locale('en');
    summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    moment.locale('fa');
    summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
    let exercisesQuestions = await Userinteractions.find({
        where : {
          isDeleted : false,
          modelId: inputs.id,
          type:'qa',
          model: 'exercises'
        }
    });

    for (let exerciseQuestions of exercisesQuestions) {
      moment.locale('en');
      exerciseQuestions.jalaaliCreatedDate = momentJalaali(exerciseQuestions.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      exerciseQuestions.jalaaliUserFriendlyCreatedDate = moment(exerciseQuestions.createdAt).fromNow();

      if (exerciseQuestions.userId) {
        let user = await Users.find({
          where : {
            id: exerciseQuestions.userId
          }
        });
        exerciseQuestions.userInfo = user[0];
        exerciseQuestions.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + exerciseQuestions.userInfo.thumbnail;
        exerciseQuestions.userInfo.url = 'http://localhost:3000/#/users/' + exerciseQuestions.userInfo.id + '/show';
      } else {
        exerciseQuestions.userInfo = {};
        exerciseQuestions.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + '5d3c66fc823c3d1be8f529d3.jpg';
        exerciseQuestions.userInfo.firstName = 'iman';
        exerciseQuestions.userInfo.lastName = 'arghamy';
      }
      
    }

    let exercisesComments = await Userinteractions.find({
      where : {
        isDeleted : false,
          modelId: inputs.id,
          type:'comment',
          model: 'exercises'
      }
  });

  for (let exerciseComments of exercisesComments) {
    moment.locale('en');
    exerciseComments.jalaaliCreatedDate = momentJalaali(exerciseComments.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    moment.locale('fa');
    exerciseComments.jalaaliUserFriendlyCreatedDate = moment(exerciseComments.createdAt).fromNow();

    if (exerciseComments.userId) {
      let user = await Users.find({
        where : {
          id: exerciseComments.userId
        }
      });
      exerciseComments.userInfo = user[0];
      exerciseComments.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + exerciseComments.userInfo.thumbnail;
      exerciseComments.userInfo.url = 'http://localhost:3000/#/users/' + exerciseComments.userInfo.id + '/show';
    } else {
      exerciseComments.userInfo = {};
      exerciseComments.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + 'IMG_20190804_103448_895.jpg';
      exerciseComments.userInfo.firstName = 'iman';
      exerciseComments.userInfo.lastName = 'arghamy';
    }
  }
    summary.thumbnail = "http://localhost:1337/files/definitionImage/" + summary.thumbnail;
    
    //  tidy up tags
    if (summary.tags) {
      let tags = JSON.parse(summary.tags);
      tagsArray = [];
    
      for (let tag of tags) {
        let tagElement = await Tags.findOne({
          id: tag.id
        });
        tagsArray.push(tagElement);
      }
      summary.tagsArray = tagsArray;
    }
    else{
      summary.tagsArray = [];
    }

    return ({
      id: inputs.id,
      summary,
      exercisesQuestions,
      exercisesComments,
      tags: [],
      thumbnail: summary.thumbnail
    });

  }

};
