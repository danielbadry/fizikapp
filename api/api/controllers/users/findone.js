var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Findone',


  description: 'Findone users.',


  inputs: {
    id: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let user = await Users.findOne({
      id: inputs.id,
      isDeleted : false
    });
    
    moment.locale('en');
    user.jalaaliCreatedDate = momentJalaali(user.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    moment.locale('fa');
    user.jalaaliUserFriendlyCreatedDate = moment(user.createdAt).fromNow();
    user.jalaaliFullUserFriendlyCreatedDate = user.jalaaliCreatedDate + ' ' + user.jalaaliUserFriendlyCreatedDate;
    return user;

  }


};
