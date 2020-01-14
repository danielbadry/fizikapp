var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Find',


  description: 'Find exercises.',


  inputs: {

    fromYear :{
      type: 'string'
    },

    field :{
      type: 'string'
    },

    reference :{
      type: 'string'
    },

    subjects :{
      type: 'string'
    },

    toYear :{
      type: 'string'
    },

    limit: {
      type: 'number'
    },

    skip: {
      type: 'number'
    },

    sort: {
      type: 'string'
    },
  },


  exits: {

  },


  fn: async function (inputs) {

    var isExistsAtListOne = (inputsSubjects, exerciseSubjects) => {
      if (inputsSubjects === '') {
        return true;
      }
      inputsSubjectsArr = inputsSubjects.split(',');
      exerciseSubjectsArr = exerciseSubjects.split(',');
      for (let exs of exerciseSubjectsArr) {
        for (let ins of inputsSubjectsArr) {
          if (exs === ins) {
            return true;
          }
        }
      }
    };

    var r = (start, end) => {
      let ans = [];
      for (let i = start; i <= end; i++) {
        ans.push(i);
      }
      return ans;
    };
    let finalData = {};
    let searchConfig = {};

    if (inputs.field) {
      searchConfig.field = inputs.field;
    }

    if (inputs.reference) {
      searchConfig.reference = inputs.reference;
    }

    if (inputs.fromYear && inputs.toYear) {
      searchConfig.year = {'in': r(inputs.fromYear, inputs.toYear)};
    }

    // return searchConfig;
    let exercises = await Exercises.find(
    searchConfig
    )
    .limit(inputs.limit)
    .skip(inputs.skip);
    
    let allEx = [];
    for (let exercise of exercises) {
      if (inputs.subjects) {
        if (isExistsAtListOne(inputs.subjects, exercise.subjects)) {
          allEx.push(exercise);
        }
      } else {
        allEx.push(exercise);
      }
    }

    exercises = allEx;
    let finalProducts = [];
    for(i = 0; i < exercises.length; i++) {
      let tempObj = {};
      let tempObj2 = {};
      tempObj.name = exercises[0].name;
      tempObj.createdAt = exercises[0].createdAt;
      tempObj.updatedAt = exercises[0].updatedAt;
      tempObj.isDeleted = exercises[0].isDeleted;
      tempObj.id = exercises[0].id;
      tempObj.title = exercises[0].title;
      tempObj.description = exercises[0].description;
      tempObj.category = exercises[0].category;
      tempObj.priority = exercises[0].priority;
      tempObj.thumbnail = exercises[0].thumbnail;
      tempObj.file = exercises[0].file;
      tempObj.duration = exercises[0].duration;
      tempObj.videoAddress = exercises[0].videoAddress;
      tempObj.userCanSeeVideo = exercises[0].userCanSeeVideo;
      tempObj.jalaaliCreatedDate = exercises[0].jalaaliCreatedDate;
      moment.locale('en');
      tempObj.jalaaliCreatedDate = momentJalaali(tempObj.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      tempObj.jalaaliUserFriendlyCreatedDate = moment(tempObj.createdAt).fromNow();
      tempObj.jalaaliUserFriendlyCreatedDate = moment(tempObj.createdAt).fromNow();
      tempObj.jalaaliFullUserFriendlyCreatedDate = tempObj.jalaaliCreatedDate + ' ' + tempObj.jalaaliUserFriendlyCreatedDate;
      if (exercises[i].tags) {
        let tags = JSON.parse(exercises[i].tags);
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
      tempObj2.id = exercises[0].id;
      tempObj2.data = {};
      tempObj2.data.summary = tempObj;
      finalProducts.push(tempObj2);
    }

    // for (let exercise of exercises) {
    //   exercise.isRiazi = false;
    //   exercise.isTajrobi = false;
    //   exercise.thumbnail = sails.config.custom.apiUrl + '/files/exerciseImage/' + exercise.thumbnail;
    //   moment.locale('en');
    //   exercise.jalaaliCreatedDate = momentJalaali(exercise.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    //   moment.locale('fa');
    //   exercise.jalaaliUserFriendlyCreatedDate = moment(exercise.createdAt).fromNow();
    //   exercise.jalaaliUserFriendlyCreatedDate = moment(exercise.createdAt).fromNow();
    //   exercise.jalaaliFullUserFriendlyCreatedDate = exercise.jalaaliCreatedDate + ' ' + exercise.jalaaliUserFriendlyCreatedDate;
    //   if (exercise.field === 'riazi') {
    //     exercise.isRiazi = true;
    //   }
    //   if (exercise.field === 'tajrobi') {
    //     exercise.isTajrobi = true;
    //   }

    // }
    finalData.data = finalProducts;
    finalData.dataLength = exercises.length;
    finalData.auth = true;
    return finalData;
  }


};
