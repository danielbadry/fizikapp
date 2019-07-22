var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Find',


  description: 'Find criticisms.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let allCriticisms = await Criticisms.find();
    
    for (let criticisms of allCriticisms) { 
      criticisms.thumbnail = 'https://lh3.googleusercontent.com/-zyP6Q-Ma140/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdArKMW1jV7KBlXHFKywuHtUjuspw.CMID/s96-c/photo.jpg';
      criticisms.userName = 'milad';  
      criticisms.name = 'milad khanmohammadi';  
      moment.locale('en');
      criticisms.jalaaliCreatedDate = momentJalaali(criticisms.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      criticisms.jalaaliUserFriendlyCreatedDate = moment(criticisms.createdAt).fromNow();
    }

    return allCriticisms;
  }


};
