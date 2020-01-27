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
    .skip(inputs.skip);
    let finalProducts = [];
    for(i = 0; i < allProducts.length; i++) {
      let tempObj = {};
      let tempObj2 = {};
      tempObj.name = allProducts[i].name;
      tempObj.createdAt = allProducts[i].createdAt;
      tempObj.updatedAt = allProducts[i].updatedAt;
      tempObj.isDeleted = allProducts[i].isDeleted;
      tempObj.id = allProducts[i].id;
      tempObj.title = allProducts[i].title;
      tempObj.description = allProducts[i].description;
      tempObj.category = allProducts[i].category;
      tempObj.isMedal = allProducts[i].isMedal;
      tempObj.priority = allProducts[i].priority;
      if (allProducts[i].thumbnail !== ''){
        tempObj.thumbnail = sails.config.custom.apiUrl + '/files/productImage/' + allProducts[i].thumbnail;
      }
      else {
        tempObj.thumbnail = sails.config.custom.apiUrl + '/files/productImage/' + 'video3.svg';
      }
      tempObj.file = sails.config.custom.apiUrl + '/files/productFiles/' + allProducts[i].file;
      tempObj.duration = allProducts[i].duration;
      tempObj.videoAddress = allProducts[i].videoAddress;
      tempObj.userCanSeeVideo = allProducts[i].userCanSeeVideo;
      tempObj.jalaaliCreatedDate = allProducts[i].jalaaliCreatedDate;
      moment.locale('en');
      tempObj.jalaaliCreatedDate = momentJalaali(tempObj.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      tempObj.jalaaliUserFriendlyCreatedDate = moment(tempObj.createdAt).fromNow();
      tempObj.jalaaliUserFriendlyCreatedDate = moment(tempObj.createdAt).fromNow();
      tempObj.jalaaliFullUserFriendlyCreatedDate = tempObj.jalaaliCreatedDate + ' ' + tempObj.jalaaliUserFriendlyCreatedDate;
      if (allProducts[i].tags) {
        let tags = JSON.parse(allProducts[i].tags);
        tagsArray = [];

        for (let tag of tags) {
          let tagElement = await Tags.findOne({
            id: tag.id
          });
          tagsArray.push(tagElement);
        }
        tempObj.tagsArray = tagsArray;
      }
      else
      {tempObj.tagsArray = [];}
      let quizs = await Quizes.find({
        where : {
          modelId: tempObj.id
        }
      });
      tempObj.hasQuiz = false;
      if (quizs.length)
      {tempObj.hasQuiz = true;}
      tempObj2.id = allProducts[i].id;
      tempObj2.data = {};
      tempObj2.data.summary = tempObj;
      tempObj2.data.thumbnail = tempObj.thumbnail;
      finalProducts.push(tempObj2);
    }

    // for (let product of allProducts) {
    //   let allViews = 0;
    //   let allLikes = 0;
    //   let allDislikes = 0;
    //   let likedislikeviews = await Likedislikeview.find({
    //     modelId: product.id,
    //     model: 'products'
    //   });
    //   for (let ldv of likedislikeviews) {
    //     if (ldv.type === 'view') {
    //       allViews ++;
    //     } else if (ldv.type === 'like') {
    //       allLikes ++;
    //     } else if (ldv.type === 'dislike') {
    //       allDislikes ++;
    //     }
    //   }
    //   product.views = allViews;
    //   product.likes = allLikes;
    //   product.dislikes = allDislikes;
    //   // find video status for this user
    //   if (inputs.userId) {
    //     let userVideoStatus = await Watchedvideos.findOne({
    //       userId : inputs.userId,
    //       modelId: product.id,
    //       model: 'products'
    //     });


    //     if (userVideoStatus && typeof userVideoStatus === 'object' && userVideoStatus.constructor === Object)
    //     {summary.startTime = userVideoStatus.startTime;}
    //   }
    //   product.thumbnail = sails.config.custom.apiUrl + '/files/productImage/' + product.thumbnail;
    //   product.file = sails.config.custom.apiUrl + '/files/productFiles/' + product.file;
    //   let quizs = await Quizes.find({
    //     where : {
    //       modelId: product.id
    //     }
    //   });
    //   product.hasQuiz = false;
    //   if (quizs.length)
    //   {product.hasQuiz = true;}

    //   moment.locale('en');
    //   product.jalaaliCreatedDate = momentJalaali(product.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    //   moment.locale('fa');
    //   product.jalaaliUserFriendlyCreatedDate = moment(product.createdAt).fromNow();
    //   product.jalaaliUserFriendlyCreatedDate = moment(product.createdAt).fromNow();
    //   product.jalaaliFullUserFriendlyCreatedDate = product.jalaaliCreatedDate + ' ' + product.jalaaliUserFriendlyCreatedDate;

    //   //  tidy up tags
    //   if (product.tags) {
    //     let tags = JSON.parse(product.tags);
    //     tagsArray = [];

    //     for (let tag of tags) {
    //       let tagElement = await Tags.findOne({
    //         id: tag.id
    //       });
    //       tagsArray.push(tagElement);
    //     }
    //     product.tagsArray = tagsArray;
    //   }
    //   else
    //   {product.tagsArray = [];}
    // }

    // allProducts[0].summary = JSON.parse(JSON.stringify(allProducts[0]));
    finalData.dataLength = dataLength.length;
    finalData.data = finalProducts;
    finalData.errorMessage = null;
    finalData.auth= true;
    return finalData;

  }

};
