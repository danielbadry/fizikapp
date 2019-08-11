var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Update one',


  description: '',


  inputs: {

    id : {
      type: 'string'
    }, 
    
    response : {
      type: 'string'
    } 
  
  },


  exits: {

  },


  fn: async function (inputs, res) {

    let result = await Criticisms.updateOne({
      id: inputs.id
    })
    .set({
      response: inputs.response
    });
    let user = await Users.find({
      where: {
        id: result.userId
      }
    })
    user = user[0];
    result.userInfo = user;
    result.userInfo.fullName = result.userInfo.firstName + ' ' + result.userInfo.lastName;
    result.thumbnail = "http://localhost:1337/files/usersImage/" + result.userInfo.thumbnail;
    if(result.response.length == 0)
      result.isResponsed = false;
    else
      result.isResponsed = true;
    
    moment.locale('en');
    result.jalaaliCreatedDate = momentJalaali(result.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    moment.locale('fa');
    result.jalaaliUserFriendlyCreatedDate = moment(result.createdAt).fromNow();
    result.jalaaliFullUserFriendlyCreatedDate = result.jalaaliCreatedDate + ' ' + result.jalaaliUserFriendlyCreatedDate;
    return result;

  }


};
