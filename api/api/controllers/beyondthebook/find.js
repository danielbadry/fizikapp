var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Find',


  description: 'Find beyondthebook.',


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
    
    userId: {
      type: 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {
    let finalData = {};
    let tagsArray = [];
    let dataLength = await Beyondthebook.find();
    let allBeyondthebook = await Beyondthebook.find()
    .limit(inputs.limit)
    .skip(inputs.skip)
    ;
    for (let beyondthebook of allBeyondthebook) {
      
      // find video status for this user
      if (inputs.userId) {
        let userVideoStatus = await Watchedvideos.findOne({
          userId : inputs.userId,
          modelId: beyondthebook.id,
          model: 'beyondthebooks'
        });
      
      
      if (userVideoStatus && typeof userVideoStatus === 'object' && userVideoStatus.constructor === Object)
        summary.startTime = userVideoStatus.startTime;
      }
        beyondthebook.thumbnail = sails.config.custom.apiUrl + "/files/beyondthebookImage/" + beyondthebook.thumbnail;
        beyondthebook.filesrc = sails.config.custom.apiUrl + "/files/beyondthebookFiles/" + beyondthebook.filesrc;
        let quizs = await Quizes.find({
          where : {
            modelId: beyondthebook.id
          }
        });
        beyondthebook.hasQuiz = false;
        if (quizs.length)
          beyondthebook.hasQuiz = true;
        
        moment.locale('en');
        beyondthebook.jalaaliCreatedDate = momentJalaali(beyondthebook.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
        moment.locale('fa');
        beyondthebook.jalaaliUserFriendlyCreatedDate = moment(beyondthebook.createdAt).fromNow();   
        beyondthebook.jalaaliUserFriendlyCreatedDate = moment(beyondthebook.createdAt).fromNow();
        beyondthebook.jalaaliFullUserFriendlyCreatedDate = beyondthebook.jalaaliCreatedDate + ' ' + beyondthebook.jalaaliUserFriendlyCreatedDate;
        
        //  tidy up tags
        if (beyondthebook.tags) {
          let tags = JSON.parse(beyondthebook.tags);
          tagsArray = [];
        
          for (let tag of tags) {
            let tagElement = await Tags.findOne({
              id: tag.id
            });
            tagsArray.push(tagElement);
          }
          beyondthebook.tagsArray = tagsArray;
        }
        else
        beyondthebook.tagsArray = [];
    }

    finalData.dataLength = dataLength.length;
    finalData.data = allBeyondthebook;
    finalData.isAuthenticated = true;
    return finalData;

  }


};
