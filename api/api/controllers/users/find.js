var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Find',


  description: 'Find users.',


  inputs: {

  },


  exits: {

  },


  fn: async function (req, res) {

    let allUsers = await Users.find();
    for (let user of allUsers) {
        user.fullName = user.firstName + ' ' + user.lastName;

        // fetch all purchases of this user
        user.totalPurchase = 2500;
        moment.locale('en');
        user.jalaaliRegisterDate = momentJalaali(user.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
        moment.locale('fa');
        user.jalaaliUserFriendlyRegisterDate = moment(user.createdAt, "YYYYMMDD").fromNow();
        user.lastLogin = new Date();
        user.numberOfInvitation = 3;
        user.jalaaliUserFriendlyCreatedDate = moment(user.createdAt).fromNow();
        user.jalaaliFullUserFriendlyCreatedDate = user.jalaaliRegisterDate + ' ' + user.jalaaliUserFriendlyCreatedDate;
        user.thumbnail = "http://localhost:1337/uploads/" + user.id + '.jpg';
    }
    return allUsers;

  }


};
