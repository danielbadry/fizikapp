var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Find',


  description: 'Find products.',


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
    },
    
    userId: {
      type: 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {
    let finalData = {};
    let tagsArray = [];
    let dataLength = await Products.find();
    let allProducts = await Products.find()
    .limit(inputs.limit)
    .skip(inputs.skip)
    ;
    
    for (let product of allProducts) {
      let allViews = 0;
      let allLikes = 0;
      let allDislikes = 0;
      let likedislikeviews = await Likedislikeview.find({
        modelId: product.id,
        model: 'products'
      });
      for (let ldv of likedislikeviews) {
        if (ldv.type === 'view') {
          allViews ++;
        } else if (ldv.type === 'like') {
          allLikes ++;
        } else if (ldv.type === 'dislike') {
          allDislikes ++;
        }
      }
      product.views = allViews;
      product.likes = allLikes;
      product.dislikes = allDislikes;
      // find video status for this user
      if (inputs.userId) {
        let userVideoStatus = await Watchedvideos.findOne({
          userId : inputs.userId,
          modelId: product.id,
          model: 'products'
        });
      
      
      if (userVideoStatus && typeof userVideoStatus === 'object' && userVideoStatus.constructor === Object)
        summary.startTime = userVideoStatus.startTime;
      }
        product.thumbnail = sails.config.custom.apiUrl + "/files/productImage/" + product.thumbnail;
        product.file = sails.config.custom.apiUrl + "/files/productFiles/" + product.file;
        let quizs = await Quizes.find({
          where : {
            modelId: product.id
          }
        });
        product.hasQuiz = false;
        if (quizs.length)
          product.hasQuiz = true;
        
        moment.locale('en');
        product.jalaaliCreatedDate = momentJalaali(product.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
        moment.locale('fa');
        product.jalaaliUserFriendlyCreatedDate = moment(product.createdAt).fromNow();   
        product.jalaaliUserFriendlyCreatedDate = moment(product.createdAt).fromNow();
        product.jalaaliFullUserFriendlyCreatedDate = product.jalaaliCreatedDate + ' ' + product.jalaaliUserFriendlyCreatedDate;
        
        //  tidy up tags
        if (product.tags) {
          let tags = JSON.parse(product.tags);
          tagsArray = [];
        
          for (let tag of tags) {
            let tagElement = await Tags.findOne({
              id: tag.id
            });
            tagsArray.push(tagElement);
          }
          product.tagsArray = tagsArray;
        }
        else
        product.tagsArray = [];
    }

    finalData.dataLength = dataLength.length;
    finalData.data = allProducts;
    finalData.isAuthenticated = true;
    return finalData;

  }


};
