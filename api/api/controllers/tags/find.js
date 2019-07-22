var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Find',


  description: 'Find tags.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    let allTags = await Tags.find();
    for (let tag of allTags) {
      tag.jalaaliCreatedDate = momentJalaali(tag.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('en');
      tag.jalaaliUserFriendlyCreatedDate = moment(tag.createdAt, "YYYYMMDD").fromNow();
  }

  return allTags;
  }


};
