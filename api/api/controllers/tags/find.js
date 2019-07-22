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
      moment.locale('en');
      tag.jalaaliCreatedDate = momentJalaali(tag.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      tag.jalaaliUserFriendlyCreatedDate = moment(tag.createdAt).fromNow();
  }

  return allTags;
  }


};
