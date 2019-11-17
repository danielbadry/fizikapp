var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Find',


  description: 'Find subjects.',


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
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let finalData = {};
    let dataLength = await Subjects.find();

    let allSubjects = await Subjects.find()
    .limit(inputs.limit)
    .skip(inputs.skip)
    ;
    for (let tag of allSubjects) {
      moment.locale('en');
      tag.jalaaliCreatedDate = momentJalaali(tag.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      tag.jalaaliUserFriendlyCreatedDate = moment(tag.createdAt).fromNow();
  }
  finalData.dataLength = dataLength.length;
  finalData.data = allSubjects;
  finalData.isAuthenticated = true;
  return finalData;

  }


};
