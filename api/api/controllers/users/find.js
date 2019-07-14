var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Find',


  description: 'Find users.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // return momentJalaali('2017-07-12T13:32:19.555Z', 'YYYY-M-D HH:mm:ss').endOf('jMonth').format('jYYYY/jM/jD HH:mm:ss') // 1392/6/31 23:59:59

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
        d.thumbnail = 'https://lh3.googleusercontent.com/-zyP6Q-Ma140/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdArKMW1jV7KBlXHFKywuHtUjuspw.CMID/s96-c/photo.jpg';
    }
    return allUsers;

  }


};
