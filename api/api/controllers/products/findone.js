var jwt = require('jsonwebtoken');
var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {

  friendlyName: 'Findone',

  description: 'Findone products.',

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

          // let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
          // let userId = decodedToken.id;
          let tagsArray = [];
          let summary = await Products.findOne({
            id: inputs.id
          });

          if (true) {
            summary.videoAddress = sails.config.custom.apiUrl + '/files/productFiles/' + summary.file;
          }
          else {
            summary.file = null;
            summary.videoAddress = null;
          }
          summary.userCanSeeVideo = false;
          moment.locale('en');
          summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
          moment.locale('fa');
          summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
          summary.thumbnail = sails.config.custom.apiUrl + '/files/productImage/' + summary.thumbnail;

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
          } });

        } else {
          let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
          let userId = decodedToken.id;
          let tagsArray = [];
          let summary = await Products.findOne({
            id: inputs.id
          });
          summary.userCanSeeVideo = true;
          if (userId) {
            // find video status for this user
            let userVideoStatus = await Watchedvideos.findOne({
              userId : userId,
              modelId: inputs.id,
              model: 'products'
            });

            if (userVideoStatus && typeof userVideoStatus === 'object' && userVideoStatus.constructor === Object)
            {
              summary.startTime = userVideoStatus.startTime;
            } else {
              summary.startTime = '0';
            }
          }
          if (true) {
            summary.videoAddress = sails.config.custom.apiUrl + '/files/productFiles/' + summary.file;
          }
          else {
            summary.file = null;
            summary.videoAddress = null;
          }

          // find hierarchical structure in its categories
          let allCategories = await Categories.find();
          let pIds = [];
          let currentCat = summary.category;
          // return currentCat;
          for (let i = 0; i < 10; i++) {
            for (let c of allCategories) {
              if (c.id === currentCat) {
                currentCat = c.parentId;
                let temp = {
                  id: c.id,
                  name: c.name,
                  parentId: c.parentId,
                };
                pIds.push(temp);
              }
            }
          }
          summary.part = pIds[0].id;
          summary.section = pIds[1].id;
          summary.season = pIds[2].id;
          summary.book = pIds[3].id;
          //
          moment.locale('en');
          summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
          moment.locale('fa');
          summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
          summary.thumbnail = sails.config.custom.apiUrl + '/files/productImage/' + summary.thumbnail;

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
          } });
        }
      });
    } else {
      let tagsArray = [];
      let summary = await Products.findOne({
        id: inputs.id
      });
      if (true) {
        summary.videoAddress = sails.config.custom.apiUrl + '/files/productFiles/' + summary.file;
      }
      else {
        summary.file = null;
        summary.videoAddress = null;
      }
      summary.userCanSeeVideo = false;
      moment.locale('en');
      summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
      summary.thumbnail = sails.config.custom.apiUrl + '/files/productImage/' + summary.thumbnail;

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

      // return ({ auth: false, errorMessage:null, data:null });
    }

  }

};
