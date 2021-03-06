var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Find',


  description: 'Find criticisms.',


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
    let dataLength = await Criticisms.find();
    let allCriticisms = await Criticisms.find()
    .limit(inputs.limit)
    .skip(inputs.skip)
    .sort([{createdAt :'DESC'}])
    ;
    
    
    // sort array based on their admin response status
    let criticismWithNoResponse = [];
    let criticismWithResponse = [];
    for (let criticism of allCriticisms) {
      if (criticism.response === '')
      {criticismWithNoResponse.push(criticism);}
      else
      {criticismWithResponse.push(criticism);}
    }
    allCriticisms = criticismWithNoResponse.concat(criticismWithResponse);
    
    for (let criticism of allCriticisms) { 
      if (criticism.userId) {
        let user = await Users.findOne({
          id: criticism.userId,
          isDeleted: false
        });
       
        criticism.userInfo = user;
        criticism.userInfo.fullName = criticism.userInfo.firstName + ' ' + criticism.userInfo.lastName;
        criticism.thumbnail = "http://localhost:1337/files/usersImage/" + criticism.userInfo.thumbnail;
        if(criticism.response.length === 0) {
          criticism.isResponsed = false;
        }
          
        else {
          criticism.isResponsed = true;
        }
          
        moment.locale('en');
        criticism.jalaaliCreatedDate = momentJalaali(criticism.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
        moment.locale('fa');
        criticism.jalaaliUserFriendlyCreatedDate = moment(criticism.createdAt).fromNow();
        criticism.jalaaliFullUserFriendlyCreatedDate = criticism.jalaaliCreatedDate + ' ' + criticism.jalaaliUserFriendlyCreatedDate;
      } else {
        criticism.userInfo = {};
        criticism.userInfo.fullName = criticism.fullName;
        criticism.thumbnail = "http://localhost:1337/files/usersImage/" + criticism.userInfo.thumbnail;
        if(criticism.response.length === 0) {
          criticism.isResponsed = false;
        }
          
        else {
          criticism.isResponsed = true;
        }
          
        moment.locale('en');
        criticism.jalaaliCreatedDate = momentJalaali(criticism.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
        moment.locale('fa');
        criticism.jalaaliUserFriendlyCreatedDate = moment(criticism.createdAt).fromNow();
        criticism.jalaaliFullUserFriendlyCreatedDate = criticism.jalaaliCreatedDate + ' ' + criticism.jalaaliUserFriendlyCreatedDate;
      }
      
    }

    finalData.dataLength = dataLength.length;
    finalData.data = allCriticisms;
    finalData.isAuthenticated = true;
    return finalData;
  }

};
