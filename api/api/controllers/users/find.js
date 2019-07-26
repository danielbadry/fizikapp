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
    for (let d of allUsers) {
        d.fullName = d.firstName + ' ' + d.lastName;

        // fetch all purchases of this user
        d.totalPurchase = 2500;
        moment.locale('en');
        d.jalaaliRegisterDate = momentJalaali(d.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
        moment.locale('fa');
        d.jalaaliUserFriendlyRegisterDate = moment(d.createdAt, "YYYYMMDD").fromNow();
        d.lastLogin = new Date();
        d.numberOfInvitation = 3;
        d.thumbnail = "http://localhost:1337/uploads/" + d.id + '.jpg';
    }
    return allUsers;

  }


};
