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

    let allRequests = await Requests.find({
      parentId: null,
      isDeleted : false
    });
    if (allRequests && allRequests.length) {
      for (let request of allRequests) {
        request.thumbnail = 'https://lh3.googleusercontent.com/-zyP6Q-Ma140/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdArKMW1jV7KBlXHFKywuHtUjuspw.CMID/s96-c/photo.jpg';
        request.userName = 'milad';  
        request.name = 'milad khanmohammadi';  
          
        moment.locale('en');
        request.jalaaliCreatedDate = momentJalaali(request.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
        moment.locale('fa');
        request.jalaaliUserFriendlyCreatedDate = moment(request.createdAt).fromNow();
        
        // fetch users answers
        request.usersAnswers = await Requests.find({
          isDeleted: false,
          parentId: request.id,
          userId: {'!=' : null}
        });
        
        // fetch admin answer
        request.adminAnswer = await Requests.find({
          isDeleted: false,
          parentId: request.id,
          userId: null
        });

        (request.adminAnswer.length == 0) ? request.isResponsed = false  : request.isResponsed = true;
      }
      return allRequests;
    }
      
    else
      return [];

  }

};
