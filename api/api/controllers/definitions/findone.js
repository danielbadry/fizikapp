var jwt = require('jsonwebtoken');
var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Findone',


  description: 'Findone definitions.',


  inputs: {

    id :{
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
          let summary = await Definitions.findOne({
            id: inputs.id
          });
          moment.locale('en');
          summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
          moment.locale('fa');
          summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
          summary.thumbnail = sails.config.custom.apiUrl + '/files/definitionImage/' + summary.thumbnail;
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
          }});
        } else {
          let tagsArray = [];
          let summary = await Definitions.findOne({
            id: inputs.id
          });

          moment.locale('en');
          summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
          moment.locale('fa');
          summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
          summary.thumbnail = sails.config.custom.apiUrl + '/files/definitionImage/' + summary.thumbnail;

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
          }});
        }});
    } else {
      let tagsArray = [];
      let summary = await Definitions.findOne({
        id: inputs.id
      });

      moment.locale('en');
      summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
      summary.thumbnail = sails.config.custom.apiUrl + '/files/definitionImage/' + summary.thumbnail;

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
      }});
    }
  }

};
