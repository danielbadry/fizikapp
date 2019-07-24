var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Find',


  description: 'Find requests.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let allRequests = await Requests.find();
    
    for (let request of allRequests) { 
      request.thumbnail = 'https://lh3.googleusercontent.com/-zyP6Q-Ma140/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdArKMW1jV7KBlXHFKywuHtUjuspw.CMID/s96-c/photo.jpg';
      request.userName = 'milad';  
      request.name = 'milad khanmohammadi';  
      request.isResponsed = false;  
      
      moment.locale('en');
      request.jalaaliCreatedDate = momentJalaali(request.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      request.jalaaliUserFriendlyCreatedDate = moment(request.createdAt).fromNow();
    }

    return allRequests;

  }


};
