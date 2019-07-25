var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Find one',


  description: '',


  inputs: {
    id : {
      type : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let request = await Requests.findOne({
      id: inputs.id,
      isDeleted : false
    });
    request.thumbnail = 'https://lh3.googleusercontent.com/-zyP6Q-Ma140/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdArKMW1jV7KBlXHFKywuHtUjuspw.CMID/s96-c/photo.jpg';
    request.userName = 'milad';  
    request.name = 'milad khanmohammadi';  
    request.isResponsed = true;  
    moment.locale('en');
    request.jalaaliCreatedDate = momentJalaali(request.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    moment.locale('fa');
    request.jalaaliUserFriendlyCreatedDate = moment(request.createdAt).fromNow();
    // fetch users answers
    request.usersAnswers = await Requests.find({
      isDeleted: false,
      parentId: inputs.id,
      userId: {'!=' : null}
    });
    
    // fetch admin answer
    request.adminAnswer = await Requests.find({
      isDeleted: false,
      parentId: inputs.id,
      userId: null
    });

    return request;
  }


};
