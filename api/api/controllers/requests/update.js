var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Update',


  description: 'Update requests.',


  inputs: {
    id: {
      type: 'string'
    },
    
    adminAnswer: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let result = await Requests.updateOne({
      id: inputs.id
    })
    .set({
      adminAnswer: inputs.adminAnswer
    });

    let user = await Users.find({
      where : {
        id : result.userId
      }
    });
    user = user[0];
    user.fullName = user.firstName + ' ' + user.lastName;
    user.thumbnail = "http://localhost:1337/uploads/" + user.thumbnail;
    result.userInfo = user;
    result.thumbnail = user.thumbnail;
    result.isResponsed = true;  
    
    moment.locale('en');
    result.jalaaliCreatedDate = momentJalaali(result.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    result.jalaaliUpdatedDate = momentJalaali(result.updatedAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    moment.locale('fa');
    result.jalaaliUserFriendlyCreatedDate = moment(result.createdAt).fromNow();
    result.jalaaliUserFriendlyUpdatedDate = moment(result.updatedAt).fromNow();
    result.jalaaliFullUserFriendlyUpdatedDate = result.jalaaliUpdatedDate + ' ' + result.jalaaliUserFriendlyUpdatedDate;
    return result;

  }


};
