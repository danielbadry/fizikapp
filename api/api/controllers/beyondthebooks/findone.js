var jwt = require('jsonwebtoken');
var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {

  friendlyName: 'Findone',

  description: 'Findone beyondthebook.',

  inputs: {

    id :{
      type: 'string'
    },

    model :{
      type: 'string'
    },

    modelId :{
      type: 'string'
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
          let tagsArray = [];
          let summary = await Beyondthebooks.findOne({
            id: inputs.id
          });

          if (true) {
            summary.videoAddress = sails.config.custom.apiUrl + '/files/beyondthebooksFiles/' + summary.file;
          }
          else {
            summary.filesrc = null;
            summary.videoAddress = null;
          }

          moment.locale('en');
          summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
          moment.locale('fa');
          summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
          summary.thumbnail = sails.config.custom.apiUrl + '/files/beyondthebooksImage/' + summary.thumbnail;

          //  tidy up tags
          if (summary.tags) {
            let tags = JSON.parse(summary.tags);
            tagsArray = [];

            for (let tag of tags) {
              let tagElement = await Tags.findOne({
                id: tag.id
              });
              tagsArray.push(tagElement);
            }
            summary.tagsArray = tagsArray;
          }
          else{
            summary.tagsArray = [];
          }

          return ({ auth: false, errorMessage:null,id: inputs.id, data:{
            id: inputs.id,
            summary,
            tags: [],
            thumbnail: summary.thumbnail,
            isAuthenticated: true
          }});
        } else {
          let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
          let userId = decodedToken.id;

          let tagsArray = [];
          let summary = await Beyondthebooks.findOne({
            id: inputs.id
          });

          if (userId) {
            let userVideoStatus = await Watchedvideos.findOne({
              userId : userId,
              modelId: inputs.id,
              model: 'beyondthebooks'
            });

            if (userVideoStatus && typeof userVideoStatus === 'object' && userVideoStatus.constructor === Object)
            {summary.startTime = userVideoStatus.startTime;}
          }

          if (true) {
            summary.videoAddress = sails.config.custom.apiUrl + '/files/beyondthebooksFiles/' + summary.file;
          }
          else {
            summary.filesrc = null;
            summary.videoAddress = null;
          }

          moment.locale('en');
          summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
          moment.locale('fa');
          summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
          summary.thumbnail = sails.config.custom.apiUrl + '/files/beyondthebooksImage/' + summary.thumbnail;

          //  tidy up tags
          if (summary.tags) {
            let tags = JSON.parse(summary.tags);
            tagsArray = [];

            for (let tag of tags) {
              let tagElement = await Tags.findOne({
                id: tag.id
              });
              tagsArray.push(tagElement);
            }
            summary.tagsArray = tagsArray;
          }
          else{
            summary.tagsArray = [];
          }

          return ({ auth: true, errorMessage:null,id: inputs.id, data:{
            id: inputs.id,
            summary,
            tags: [],
            thumbnail: summary.thumbnail,
            isAuthenticated: true
          }});
        }
      });

    } else {
      let tagsArray = [];
      let summary = await Beyondthebooks.findOne({
        id: inputs.id
      });

      if (true) {
        summary.videoAddress = sails.config.custom.apiUrl + '/files/beyondthebooksFiles/' + summary.file;
      }
      else {
        summary.filesrc = null;
        summary.videoAddress = null;
      }

      moment.locale('en');
      summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
      summary.thumbnail = sails.config.custom.apiUrl + '/files/beyondthebooksImage/' + summary.thumbnail;

      //  tidy up tags
      if (summary.tags) {
        let tags = JSON.parse(summary.tags);
        tagsArray = [];

        for (let tag of tags) {
          let tagElement = await Tags.findOne({
            id: tag.id
          });
          tagsArray.push(tagElement);
        }
        summary.tagsArray = tagsArray;
      }
      else{
        summary.tagsArray = [];
      }

      return ({ auth: false, errorMessage:null,id: inputs.id, data:{
        id: inputs.id,
        summary,
        tags: [],
        thumbnail: summary.thumbnail,
        auth: true
      }});
    }
  }

};
