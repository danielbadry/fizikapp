var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Find',


  description: 'Find police.',


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
    let dataLength = await Police.find();
    let allPolice = await Police.find()
    .limit(inputs.limit)
    .skip(inputs.skip)
    ;
    
    for (let police of allPolice) {
      let user = await Users.find({
        where : {
          id : police.userId
        }
      });
      police.userInfo = user[0];
      police.userInfo.fullName = police.userInfo.firstName + ' ' + police.userInfo.lastName;
      police.thumbnail = "http://localhost:1337/files/usersImage/" + police.userInfo.thumbnail;

      moment.locale('en');
      police.jalaaliCreatedDate = momentJalaali(police.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      police.jalaaliUserFriendlyCreatedDate = moment(police.createdAt).fromNow();
      police.jalaaliFullUserFriendlyCreatedDate = police.jalaaliCreatedDate + ' ' + police.jalaaliUserFriendlyCreatedDate;
    }
    finalData.dataLength = dataLength.length;
    finalData.data = allPolice;
    return finalData;
  }


};
