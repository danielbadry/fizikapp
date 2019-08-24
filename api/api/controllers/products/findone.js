var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {

  friendlyName: 'Findone',

  description: 'Findone products.',

  inputs: {

    id :{
      type: 'string'
    }

  },

  exits: {

  },

  fn: async function (inputs) {
    let tagsArray = [];
    let summary = await Products.findOne({
      id: inputs.id
    });
    
    let productsquestions = await Productsquestions.find({
        where : {
          isDeleted : false,
          productId: inputs.id
        }
    });

    for (let productsquestion of productsquestions) {
      moment.locale('en');
      productsquestion.jalaaliCreatedDate = momentJalaali(productsquestion.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      productsquestion.jalaaliUserFriendlyCreatedDate = moment(productsquestion.createdAt).fromNow();

      if (productsquestion.userId) {
        let user = await Users.find({
          where : {
            id: productsquestion.userId
          }
        });
        productsquestion.userInfo = user[0];
        productsquestion.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + productsquestion.userInfo.thumbnail;
        productsquestion.userInfo.url = 'http://localhost:3000/#/users/' + productsquestion.userInfo.id + '/show';
      } else {
        productsquestion.userInfo = {};
        productsquestion.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + '5d3c66fc823c3d1be8f529d3.jpg';
        productsquestion.userInfo.firstName = 'iman';
        productsquestion.userInfo.lastName = 'arghamy';
      }
      
    }
    
    let productscomments = await Productscomments.find({
        where : {
          isDeleted : false,
          productId: inputs.id
        }
    });

    for (let productscomment of productscomments) {
      moment.locale('en');
      productscomment.jalaaliCreatedDate = momentJalaali(productscomment.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      productscomment.jalaaliUserFriendlyCreatedDate = moment(productscomment.createdAt).fromNow();

      if (productscomment.userId) {
        let user = await Users.find({
          where : {
            id: productscomment.userId
          }
        });
        productscomment.userInfo = user[0];
        productscomment.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + productscomment.userInfo.thumbnail;
        productscomment.userInfo.url = 'http://localhost:3000/#/users/' + productscomment.userInfo.id + '/show';
      } else {
        productscomment.userInfo = {};
        productscomment.userInfo.thumbnail = 'http://localhost:1337/files/usersImage/' + 'IMG_20190804_103448_895.jpg';
        productscomment.userInfo.firstName = 'iman';
        productscomment.userInfo.lastName = 'arghamy';
      }
      
    }
    summary.thumbnail = "http://localhost:1337/files/productImage/" + summary.thumbnail;
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
    
    return ({
      id: inputs.id,
      summary,
      productsquestions,
      productscomments,
      tags: [],
      thumbnail: summary.thumbnail
    });
  }

};
