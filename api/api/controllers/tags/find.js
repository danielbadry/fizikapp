var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Find',


  description: 'Find tags.',


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
    let dataLength = await Tags.find();

    let allTags = await Tags.find()
    .limit(inputs.limit)
    .skip(inputs.skip)
    ;
    for (let tag of allTags) {
      moment.locale('en');
      tag.jalaaliCreatedDate = momentJalaali(tag.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      tag.jalaaliUserFriendlyCreatedDate = moment(tag.createdAt).fromNow();
  }
  finalData.dataLength = dataLength.length;
  finalData.data = allTags;
  return finalData;
  }


};
