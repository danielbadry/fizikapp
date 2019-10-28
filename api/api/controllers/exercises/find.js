var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Find',


  description: 'Find exercises.',


  inputs: {
    
    startedDate :{
      type: 'string'
    },
    
    endDate :{
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
    var r = (start, end) => {
      let ans = [];
      for (let i = start ; i <= end ; i++) {
        ans.push(i);
      }
      return ans;
    }
    let finalData = {};
    let dataLength = await Exercises.find();
    let exercises = await Exercises.find(
    //{
    //   where : {
    //     field: inputs.field,
    //     year: {'in': r(inputs.startedDate, inputs.endDate)}
    //   }
    // }
    )
    .limit(inputs.limit)
    .skip(inputs.skip)  
    ;

    for (let exercise of exercises) {
      exercise.isRiazi = false;
      exercise.isTajrobi = false;
      exercise.thumbnail = sails.config.custom.apiUrl + "/files/exerciseImage/" + exercise.thumbnail;
      moment.locale('en');
      exercise.jalaaliCreatedDate = momentJalaali(exercise.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      exercise.jalaaliUserFriendlyCreatedDate = moment(exercise.createdAt).fromNow();   
      exercise.jalaaliUserFriendlyCreatedDate = moment(exercise.createdAt).fromNow();
      exercise.jalaaliFullUserFriendlyCreatedDate = exercise.jalaaliCreatedDate + ' ' + exercise.jalaaliUserFriendlyCreatedDate;
      if (exercise.field == 'riazi')
        exercise.isRiazi = true;
      if (exercise.field == 'tajrobi')
      exercise.isTajrobi = true;

    }
    finalData.dataLength = dataLength.length;
    finalData.data = exercises;
    return finalData;

  }


};
