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

    searchConfig.year = {'in': r(inputs.fromYear, inputs.toYear)};

    let exercises = await Exercises.find(
    searchConfig
    )
    .limit(inputs.limit)
    .skip(inputs.skip);

    let allEx = [];
    for (let exercise of exercises) {
      if (isExistsAtListOne(inputs.subjects, exercise.subjects)) {
        allEx.push(exercise);
      }
    }

    exercises = allEx;
    for (let exercise of exercises) {
      exercise.isRiazi = false;
      exercise.isTajrobi = false;
      exercise.thumbnail = sails.config.custom.apiUrl + '/files/exerciseImage/' + exercise.thumbnail;
      moment.locale('en');
      exercise.jalaaliCreatedDate = momentJalaali(exercise.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      exercise.jalaaliUserFriendlyCreatedDate = moment(exercise.createdAt).fromNow();
      exercise.jalaaliUserFriendlyCreatedDate = moment(exercise.createdAt).fromNow();
      exercise.jalaaliFullUserFriendlyCreatedDate = exercise.jalaaliCreatedDate + ' ' + exercise.jalaaliUserFriendlyCreatedDate;
      if (exercise.field === 'riazi') {
        exercise.isRiazi = true;
      }
      if (exercise.field === 'tajrobi') {
        exercise.isTajrobi = true;
      }

    }
    finalData.data = exercises;
    finalData.dataLength = exercises.length;
    return finalData;
  }


};
