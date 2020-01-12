var jwt = require('jsonwebtoken');
var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {

  friendlyName: 'Findone',

  description: 'Findone sciencechallenge.',

  inputs: {

    id :{
      type: 'string'
    },

  },

  exits: {

  },

  fn: async function (inputs) {
    if (this.req.headers.authorization) {
      let token = this.req.headers.authorization;
      let TokenArray = token.split(' ');
      return jwt.verify(TokenArray[1], sails.config.custom.secret, async (err, decoded) => {
        if (err) {
          let summary = await Sciencechallenge.findOne({
            id: inputs.id
          });

          moment.locale('en');
          summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
          moment.locale('fa');
          summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
          summary.thumbnail = sails.config.custom.apiUrl + '/files/sciencechallengeImage/' + summary.thumbnail;
          summary.videoAddress = sails.config.custom.apiUrl + '/files/sciencechallengeFiles/' + summary.file;

          return ({
            id: inputs.id,
            summary,
            thumbnail: summary.thumbnail,
            isUserAnswered: {
              data:{},
              isUserAnswered:false
            },
            isAuthenticated: false
          });
        } else {
          var userId = decoded.id;
          let summary = await Sciencechallenge.findOne({
            id: inputs.id
          });

          var isUserAnswered = await Sciencechallengeresponse.findOne({
            sciencechallengeId : inputs.id,
            userId: userId
          });

          if (typeof isUserAnswered === 'object' && isUserAnswered.constructor === Object) {
            isUserAnswered = {
              data:isUserAnswered,
              isUserAnswered:true
            };
          } else {
            isUserAnswered = {
              data:{},
              isUserAnswered:false
            };
          }

          let userVideoStatus = await Watchedvideos.findOne({
            userId : userId,
            modelId: inputs.id,
            model: 'sciencechallenge'
          });

          if (userVideoStatus && typeof userVideoStatus === 'object' && userVideoStatus.constructor === Object)
          {summary.startTime = userVideoStatus.startTime;}
          summary.videoAddress = sails.config.custom.apiUrl + '/files/sciencechallengeFiles/' + summary.file;
          moment.locale('en');
          summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
          moment.locale('fa');
          summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
          summary.thumbnail = sails.config.custom.apiUrl + '/files/sciencechallengeImage/' + summary.thumbnail;
          summary.videoAddress = sails.config.custom.apiUrl + '/files/sciencechallengeFiles/' + summary.file;
          return ({
            id: inputs.id,
            summary,
            thumbnail: summary.thumbnail,
            isUserAnswered: isUserAnswered,
            isAuthenticated: true
          });
        }
      });
    } else {
      let summary = await Sciencechallenge.findOne({
        id: inputs.id
      });

      moment.locale('en');
      summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
      summary.thumbnail = sails.config.custom.apiUrl + '/files/sciencechallengeImage/' + summary.thumbnail;
      summary.videoAddress = sails.config.custom.apiUrl + '/files/sciencechallengeFiles/' + summary.file;
      return ({
        id: inputs.id,
        summary,
        thumbnail: summary.thumbnail,
        isUserAnswered: {
          data:{},
          isUserAnswered:false
        },
        isAuthenticated: false
      });

    }
  }
};
