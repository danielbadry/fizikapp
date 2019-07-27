var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Find',


  description: 'Find police.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let allPolice = await Police.find();
    if (allPolice && allPolice.length) {
      for (let police of allPolice) {

        moment.locale('en');
        police.jalaaliCreatedDate = momentJalaali(police.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
        moment.locale('fa');
        police.jalaaliUserFriendlyCreatedDate = moment(police.createdAt).fromNow();
      }
      return allPolice;
    }
      
    else
      return [];

  }


};
