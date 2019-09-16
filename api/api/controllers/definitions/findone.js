var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Findone',


  description: 'Findone definitions.',


  inputs: {

    id :{
      type: 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    let tagsArray = [];
    let summary = await Definitions.findOne({
      id: inputs.id
    });

    moment.locale('en');
    summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    moment.locale('fa');
    summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
    let definitionsQuestions = await Userinteractions.find({
        where : {
          isDeleted : false,
          modelId: inputs.id,
          type:'qa',
          model: 'definitions'
        }
    });

    for (let definitionsQuestion of definitionsQuestions) {
      moment.locale('en');
      definitionsQuestion.jalaaliCreatedDate = momentJalaali(definitionsQuestion.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      definitionsQuestion.jalaaliUserFriendlyCreatedDate = moment(definitionsQuestion.createdAt).fromNow();

      if (definitionsQuestion.userId) {
        let user = await Users.find({
          where : {
            id: definitionsQuestion.userId
          }
        });
        definitionsQuestion.userInfo = user[0];
        definitionsQuestion.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + definitionsQuestion.userInfo.thumbnail;
        definitionsQuestion.userInfo.url = 'http://localhost:3000/#/users/' + definitionsQuestion.userInfo.id + '/show';
      } else {
        definitionsQuestion.userInfo = {};
        definitionsQuestion.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + '5d3c66fc823c3d1be8f529d3.jpg';
        definitionsQuestion.userInfo.firstName = 'iman';
        definitionsQuestion.userInfo.lastName = 'arghamy';
      }
      
    }

    let definitionsComments = await Userinteractions.find({
      where : {
        isDeleted : false,
          modelId: inputs.id,
          type:'comment',
          model: 'definitions'
      }
  });

  for (let definitionComments of definitionsComments) {
    moment.locale('en');
    definitionComments.jalaaliCreatedDate = momentJalaali(definitionComments.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    moment.locale('fa');
    definitionComments.jalaaliUserFriendlyCreatedDate = moment(definitionComments.createdAt).fromNow();

    if (definitionComments.userId) {
      let user = await Users.find({
        where : {
          id: definitionComments.userId
        }
      });
      definitionComments.userInfo = user[0];
      definitionComments.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + definitionComments.userInfo.thumbnail;
      definitionComments.userInfo.url = 'http://localhost:3000/#/users/' + definitionComments.userInfo.id + '/show';
    } else {
      definitionComments.userInfo = {};
      definitionComments.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + 'IMG_20190804_103448_895.jpg';
      definitionComments.userInfo.firstName = 'iman';
      definitionComments.userInfo.lastName = 'arghamy';
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
      definitionsQuestions,
      definitionsComments,
      tags: [],
      thumbnail: summary.thumbnail
    });

  }

};
