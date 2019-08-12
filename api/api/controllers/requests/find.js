var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Find',


  description: 'Find requests.',


  inputs: {
    limit: {
      type: 'number'
    },
    
    skip: {
      type: 'number'
    },

    sort: {
      type: 'string'
    },
    
    where: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    let finalData = {};
    let dataLength = await Requests.find({
      where : {
        parentId: ''
      }
    });
    let allRequests = await Requests.find({
      parentId: '',
      isDeleted : false
    })
    .limit(inputs.limit)
    .skip(inputs.skip)
    .sort([{updatedAt :'DESC'}])
    ;
    
    // sort array based on their admin response status
    let requestWithNoResponse = [];
    let requestWithResponse = [];
    for (let request of allRequests) {
      if (request.adminAnswer == '')
        requestWithNoResponse.push(request);
      else 
        requestWithResponse.push(request);
    }
    allRequests = requestWithNoResponse.concat(requestWithResponse);
    // return allRequests;
      for (let request of allRequests) {
        let user = await Users.find ({
          where : {
            id : request.userId
          }
        });
        request.userInfo = user[0];
        request.userInfo.fullName = request.userInfo.firstName + ' ' + request.userInfo.lastName;
        request.thumbnail = "http://localhost:1337/files/usersImage/" + request.userInfo.thumbnail;
          
        moment.locale('en');
        request.jalaaliCreatedDate = momentJalaali(request.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
        request.jalaaliUpdatedDate = momentJalaali(request.updatedAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
        moment.locale('fa');
        request.jalaaliUserFriendlyCreatedDate = moment(request.createdAt).fromNow();
        request.jalaaliUserFriendlyUpdatedDate = moment(request.updatedAt).fromNow();
        request.jalaaliFullUserFriendlyUpdatedDate = request.jalaaliUpdatedDate + ' ' + request.jalaaliUserFriendlyUpdatedDate;
    
        // fetch users answers
        request.usersAnswers = await Requests.find({
          isDeleted: false,
          parentId: request.id,
          userId: {'!=' : null}
        });

        for (let requestUserAnswer of request.usersAnswers) {
          let userAnswerUser = await Users.find ({
            where : {
              id : requestUserAnswer.userId
            }
          });
          requestUserAnswer.userInfo = userAnswerUser[0];
          requestUserAnswer.userInfo.fullName = requestUserAnswer.userInfo.firstName + ' ' + requestUserAnswer.userInfo.lastName;
          requestUserAnswer.thumbnail = "http://localhost:1337/uploads/" + requestUserAnswer.userInfo.thumbnail;
        }
        
        (request.adminAnswer == '') ? request.isResponsed = false  : request.isResponsed = true;
      }
      finalData.dataLength = allRequests.length;
      finalData.data = allRequests;
      return finalData;
  }

};
