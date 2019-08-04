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
    
      for (let request of allRequests) {
        let user = await Users.find ({
          where : {
            id : request.userId
          }
        });
        request.userInfo = user[0];
        request.userInfo.fullName = request.userInfo.firstName + ' ' + request.userInfo.lastName;
        request.thumbnail = "http://localhost:1337/uploads/" + request.userInfo.thumbnail;
          
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
          userId: ''
        });

        (request.adminAnswer == '') ? request.isResponsed = false  : request.isResponsed = true;
      }
      return allRequests;

  }

};
