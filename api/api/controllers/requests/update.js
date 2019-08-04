var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Update',


  description: 'Update requests.',


  inputs: {
    id: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let result = await Requests.updateOne({
      id: inputs.id
    })
    .set({
      adminAnswer: 'javab'
    });

    let user = await Users.find({
      where : {
        id : result.userId
      }
    });
    
    result.thumbnail = "http://localhost:1337/uploads/" + user[0].thumbnail;
    result.isResponsed = true;  
    
    moment.locale('en');
    result.jalaaliCreatedDate = momentJalaali(result.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    moment.locale('fa');
    result.jalaaliUserFriendlyCreatedDate = moment(result.createdAt).fromNow();
    return result;

  }


};
