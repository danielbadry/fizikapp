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
      tempObj.name = exercises[i].name;
      tempObj.createdAt = exercises[i].createdAt;
      tempObj.updatedAt = exercises[i].updatedAt;
      tempObj.isDeleted = exercises[i].isDeleted;
      tempObj.id = exercises[i].id;
      tempObj.title = exercises[i].title;
      tempObj.description = exercises[i].description;
      tempObj.category = exercises[i].category;
      tempObj.year = exercises[i].year;

      if (exercises[i].field === 'riazi') {
        tempObj.isRiazi = true;
      }

      if (exercises[i].field === 'tajrobi') {
        tempObj.isTajrobi = true;
      }

      if (exercises[i].thumbnail !== ''){
        tempObj.thumbnail = sails.config.custom.apiUrl + '/files/exerciseImage/' + exercises[i].thumbnail;
      }
      else {
        tempObj.thumbnail = '';
      }
      tempObj.file = exercises[i].file;
      tempObj.duration = exercises[i].duration;
      tempObj.videoAddress = exercises[i].videoAddress;
      tempObj.userCanSeeVideo = exercises[i].userCanSeeVideo;
      tempObj.jalaaliCreatedDate = exercises[i].jalaaliCreatedDate;
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
      tempObj2.id = exercises[i].id;
      tempObj2.data = {};
      tempObj2.data.summary = tempObj;
      tempObj2.data.thumbnail = tempObj.thumbnail;
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
