var moment = require('moment');
var momentJalaali = require('moment-jalaali');
var jwt = require('jsonwebtoken');

module.exports = {

  friendlyName: 'Find',

  description: 'Find userinteractions.',

  inputs: {

    model:{
      type:'string'
    },

    modelid:{
      type:'string'
    },

    type:{
      type:'string'
    }

  },

  exits: {

  },

  fn: async function (inputs) {

    if (this.req.headers.authorization) {
      let token = this.req.headers.authorization;
      let TokenArray = token.split(' ');
      return jwt.verify(TokenArray[1], sails.config.custom.secret, async (err, decoded) => {
        if (err) {
          return 'umad inja';
        } else {
          // return decoded;
          let user = await Users.findOne({
            id : decoded.id
          });
          // return user;
          let userinteractions = await Userinteractions.find({
            type: inputs.type,
            model: inputs.model,
            isDeleted : false,
            modelId: inputs.modelid
          })
          .sort([
            { createdAt: 'DESC' },
          ]);
          // return userinteractions;
          for (let userinteraction of userinteractions) {
            moment.locale('en');
            userinteraction.jalaaliCreatedDate = momentJalaali(userinteraction.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
            moment.locale('fa');
            userinteraction.jalaaliUserFriendlyCreatedDate = moment(userinteraction.createdAt).fromNow();
            userinteraction.canDelete = (user.isAdmin ? true : false);
            if (userinteraction.userId) {
              let user = await Users.find({
                where : {
                  id: userinteraction.userId
                }
              });
              userinteraction.userInfo = user[0];
              if(userinteraction.userInfo.thumbnail === ''){
                userinteraction.userInfo.thumbnail = sails.config.custom.apiUrl + '/files/usersImage/' + 'unknown.png';
              }
              else {
                userinteraction.userInfo.thumbnail = sails.config.custom.apiUrl + '/files/usersImage/' + userinteraction.userInfo.thumbnail;
              }

              userinteraction.userInfo.url = sails.config.custom.siteUrl + '/#/users/' + userinteraction.userInfo.id + '/show';
            } else {
              userinteraction.userInfo = {};
              userinteraction.userInfo.thumbnail = sails.config.custom.apiUrl + '/files/usersImage/' + 'IMG_20190804_103448_895.jpg';
              userinteraction.userInfo.firstName = 'iman';
              userinteraction.userInfo.lastName = 'arghamy';
            }

          }
          let finalData = {};
          finalData.dataLength = userinteractions.length;
          finalData.data = userinteractions;
          finalData.errorMessage = null;
          finalData.auth= true;
          return finalData;
        }
      });

    } else {

      // return user;
      let userinteractions = await Userinteractions.find({
        type: inputs.type,
        model: inputs.model,
        isDeleted : false,
        modelId: inputs.modelid
      })
          .sort([
            { createdAt: 'DESC' },
          ]);
      // return userinteractions;
      for (let userinteraction of userinteractions) {
        moment.locale('en');
        userinteraction.jalaaliCreatedDate = momentJalaali(userinteraction.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
        moment.locale('fa');
        userinteraction.jalaaliUserFriendlyCreatedDate = moment(userinteraction.createdAt).fromNow();
        userinteraction.canDelete = false;
        if (userinteraction.userId) {
          let user = await Users.find({
            where : {
              id: userinteraction.userId
            }
          });
          userinteraction.userInfo = user[0];
          if(userinteraction.userInfo.thumbnail === ''){
            userinteraction.userInfo.thumbnail = sails.config.custom.apiUrl + '/files/usersImage/' + 'unknown.png';
          }
          else {
            userinteraction.userInfo.thumbnail = sails.config.custom.apiUrl + '/files/usersImage/' + userinteraction.userInfo.thumbnail;
          }

          userinteraction.userInfo.url = sails.config.custom.siteUrl + '/#/users/' + userinteraction.userInfo.id + '/show';
        } else {
          userinteraction.userInfo = {};
          userinteraction.userInfo.thumbnail = sails.config.custom.apiUrl + '/files/usersImage/' + 'IMG_20190804_103448_895.jpg';
          userinteraction.userInfo.firstName = 'iman';
          userinteraction.userInfo.lastName = 'arghamy';
        }

      }
      let finalData = {};
      finalData.dataLength = userinteractions.length;
      finalData.data = userinteractions;
      finalData.errorMessage = null;
      finalData.auth= true;
      return finalData;
    }


  }

};
