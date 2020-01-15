var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Find',


  description: 'Find beyondthebooks.',


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
    let dataLength = await Beyondthebooks.find();
    let allBeyondthebooks = await Beyondthebooks.find()
    .limit(inputs.limit)
    .skip(inputs.skip);
    let finalProducts = [];
    for(i = 0; i < allBeyondthebooks.length; i++) {
      let tempObj = {};
      let tempObj2 = {};
      tempObj.name = allBeyondthebooks[i].name;
      tempObj.createdAt = allBeyondthebooks[i].createdAt;
      tempObj.updatedAt = allBeyondthebooks[i].updatedAt;
      tempObj.isDeleted = allBeyondthebooks[i].isDeleted;
      tempObj.id = allBeyondthebooks[i].id;
      tempObj.title = allBeyondthebooks[i].title;
      tempObj.description = allBeyondthebooks[i].description;
      tempObj.category = allBeyondthebooks[i].category;
      tempObj.isMedal = allBeyondthebooks[i].isMedal;
      tempObj.priority = allBeyondthebooks[i].priority;
      if (allBeyondthebooks[i].thumbnail !== ''){
        tempObj.thumbnail = sails.config.custom.apiUrl + '/files/beyondthebooksImage/' + allBeyondthebooks[i].thumbnail;
      }
      else {
        tempObj.thumbnail = '';
      }
      tempObj.file = allBeyondthebooks[i].file;
      tempObj.duration = allBeyondthebooks[i].duration;
      tempObj.videoAddress = allBeyondthebooks[i].videoAddress;
      tempObj.userCanSeeVideo = allBeyondthebooks[i].userCanSeeVideo;
      tempObj.jalaaliCreatedDate = allBeyondthebooks[i].jalaaliCreatedDate;
      moment.locale('en');
      tempObj.jalaaliCreatedDate = momentJalaali(tempObj.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      tempObj.jalaaliUserFriendlyCreatedDate = moment(tempObj.createdAt).fromNow();
      tempObj.jalaaliUserFriendlyCreatedDate = moment(tempObj.createdAt).fromNow();
      tempObj.jalaaliFullUserFriendlyCreatedDate = tempObj.jalaaliCreatedDate + ' ' + tempObj.jalaaliUserFriendlyCreatedDate;
      if (allBeyondthebooks[i].tags) {
        let tags = JSON.parse(allBeyondthebooks[i].tags);
        tagsArray = [];

        for (let tag of tags) {
          let tagElement = await Tags.findOne({
            id: tag.id
          });
          tagsArray.push(tagElement);
        }
        tempObj.tagsArray = tagsArray;
      }
      else
      {tempObj.tagsArray = [];}
      let quizs = await Quizes.find({
        where : {
          modelId: tempObj.id
        }
      });
      tempObj.hasQuiz = false;
      if (quizs.length)
      {tempObj.hasQuiz = true;}
      tempObj2.id = allBeyondthebooks[i].id;
      tempObj2.data = {};
      tempObj2.data.summary = tempObj;
      tempObj2.data.thumbnail = tempObj.thumbnail;
      finalProducts.push(tempObj2);
    }
    // for (let beyondthebook of allBeyondthebooks) {
    //   let allViews = 0;
    //   let allLikes = 0;
    //   let allDislikes = 0;
    //   let likedislikeviews = await Likedislikeview.find({
    //     modelId: beyondthebook.id,
    //     model: 'beyondthebooks'
    //   });
    //   for (let ldv of likedislikeviews) {
    //     if (ldv.type === 'view') {
    //       allViews ++;
    //     } else if (ldv.type === 'like') {
    //       allLikes ++;
    //     } else if (ldv.type === 'dislike') {
    //       allDislikes ++;
    //     }
    //   }
    //   beyondthebook.views = allViews;
    //   beyondthebook.likes = allLikes;
    //   beyondthebook.dislikes = allDislikes;
    //   // find video status for this user
    //   if (inputs.userId) {
    //     let userVideoStatus = await Watchedvideos.findOne({
    //       userId : inputs.userId,
    //       modelId: beyondthebook.id,
    //       model: 'beyondthebooks'
    //     });


    //     if (userVideoStatus && typeof userVideoStatus === 'object' && userVideoStatus.constructor === Object)
    //     {summary.startTime = userVideoStatus.startTime;}
    //   }
    //   beyondthebook.thumbnail = sails.config.custom.apiUrl + '/files/beyondthebooksImage/' + beyondthebook.thumbnail;
    //   beyondthebook.filesrc = sails.config.custom.apiUrl + '/files/beyondthebooksFiles/' + beyondthebook.filesrc;
    //   let quizs = await Quizes.find({
    //     where : {
    //       modelId: beyondthebook.id
    //     }
    //   });
    //   beyondthebook.hasQuiz = false;
    //   if (quizs.length)
    //   {beyondthebook.hasQuiz = true;}

    //   moment.locale('en');
    //   beyondthebook.jalaaliCreatedDate = momentJalaali(beyondthebook.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    //   moment.locale('fa');
    //   beyondthebook.jalaaliUserFriendlyCreatedDate = moment(beyondthebook.createdAt).fromNow();
    //   beyondthebook.jalaaliUserFriendlyCreatedDate = moment(beyondthebook.createdAt).fromNow();
    //   beyondthebook.jalaaliFullUserFriendlyCreatedDate = beyondthebook.jalaaliCreatedDate + ' ' + beyondthebook.jalaaliUserFriendlyCreatedDate;

    //   //  tidy up tags
    //   if (beyondthebook.tags) {
    //     let tags = JSON.parse(beyondthebook.tags);
    //     tagsArray = [];

    //     for (let tag of tags) {
    //       let tagElement = await Tags.findOne({
    //         id: tag.id
    //       });
    //       tagsArray.push(tagElement);
    //     }
    //     beyondthebook.tagsArray = tagsArray;
    //   }
    //   else
    //   {beyondthebook.tagsArray = [];}
    // }

    finalData.dataLength = dataLength.length;
    finalData.data = finalProducts;
    finalData.auth = true;
    return finalData;

  }


};
