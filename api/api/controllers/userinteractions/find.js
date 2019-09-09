var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {

  friendlyName: 'Find',

  description: 'Find userinteractions.',

  inputs: {

    model:{
      type:'string'
    },

    modelId:{
      type:'string'
    },
    
    type:{
      type:'string'
    }

  },

  exits: {

  },

  fn: async function (inputs) {
    let userinteractions = await Userinteractions.find({
      where : {
        type: inputs.type,
        model: inputs.model,
        isDeleted : false,
        modelId: inputs.modelId
      }
    });
    
    for (let userinteraction of userinteractions) {
      moment.locale('en');
      userinteraction.jalaaliCreatedDate = momentJalaali(userinteraction.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      userinteraction.jalaaliUserFriendlyCreatedDate = moment(userinteraction.createdAt).fromNow();

      if (userinteraction.userId) {
        let user = await Users.find({
          where : {
            id: userinteraction.userId
          }
        });
        userinteraction.userInfo = user[0];
        userinteraction.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + userinteraction.userInfo.thumbnail;
        userinteraction.userInfo.url = 'http://localhost:3000/#/users/' + userinteraction.userInfo.id + '/show';
      } else {
        userinteraction.userInfo = {};
        userinteraction.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + 'IMG_20190804_103448_895.jpg';
        userinteraction.userInfo.firstName = 'iman';
        userinteraction.userInfo.lastName = 'arghamy';
      }
      
    }
    return userinteractions;
  }

};
