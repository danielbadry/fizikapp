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
    
    let user = await Users.find({
      where : {
        id: request.userId,
        isDeleted: false
      }
    });

    request.userInfo = user[0];
    request.thumbnail = "http://localhost:1337/files/usersImage/" + request.userInfo.thumbnail;
    request.userInfo.fullName = request.userInfo.firstName + ' ' + request.userInfo.lastName;
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
    for (let requestUserAnswer of request.usersAnswers) {
      let user = await Users.find ({
        where : {
          id : requestUserAnswer.userId
        }
      });
      requestUserAnswer.userInfo = user[0];
      requestUserAnswer.userInfo.fullName = requestUserAnswer.userInfo.firstName + ' ' + requestUserAnswer.userInfo.lastName;
      requestUserAnswer.userInfo.url = 'http://localhost:3000/#/users/' + requestUserAnswer.userInfo.id + '/show';
      requestUserAnswer.thumbnail = "http://localhost:1337/files/usersImage/" + requestUserAnswer.userInfo.thumbnail;
    }
    
    // fetch admin answer
    request.adminAnswer = await Requests.find({
      isDeleted: false,
      parentId: inputs.id,
      userId: null
    });
    request.isAuthenticated= true;
    return request;
  }


};
