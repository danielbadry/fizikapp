var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {

  friendlyName: 'Find',

  description: 'Find definitions.',

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
    
    tags: {
      type: 'string'
    },
    
    searchText: {
      type: 'string'
    }
  },

  exits: {

  },

  fn: async function (inputs) {
     let finalData = {};
    let finalRequests = [];
    let dataLength = await Definitions.find();
    let allRequests;

    if(inputs.searchText == '' || !inputs.searchText)
    {
      allRequests = await Definitions.find()
      .limit(inputs.limit)
      .skip(inputs.skip)
      .sort([{updatedAt :'DESC'}])
      ;
    }
    
    else {
      allRequests = await Definitions.find({
        or : [
            {
              name:{contains: inputs.searchText}
            },
            {
              title:{contains: inputs.searchText}
            },
            {
              description:{contains: inputs.searchText}
            }
          ]
      })
      .limit(inputs.limit)
      .skip(inputs.skip)
      .sort([{updatedAt :'DESC'}])
      ;
    }

    // filter allRequest based on tags
    if (inputs.tags)
    {
      let tagIds = []; // list of comming tags id from the URL
      let inTags = [];
      if(JSON.parse(inputs.tags).length === 0) {
        inTags = await Tags.find();
      } else {
        inTags = JSON.parse(inputs.tags);
      }
      
      for(let inTag of inTags) {
        tagIds.push(inTag.id);
      }

      for (let request of allRequests) {
        let aa = [];
        requestTags = JSON.parse(request.tags);
        for (let requestTag of requestTags) {
          aa.push(requestTag.id);
        }

        for (let a of aa) {
          if (tagIds.includes(a)) {
            if (await sails.helpers.requesthelper(request, finalRequests))
              finalRequests.push(request);
          }
        }
      }
      allRequests = finalRequests;
    }
    let finalProducts = [];
    for(i = 0; i < allRequests.length; i++) {
      let tempObj = {};
      let tempObj2 = {};
      tempObj.name = allRequests[0].name;
      tempObj.createdAt = allRequests[0].createdAt;
      tempObj.updatedAt = allRequests[0].updatedAt;
      tempObj.isDeleted = allRequests[0].isDeleted;
      tempObj.id = allRequests[0].id;
      tempObj.title = allRequests[0].title;
      tempObj.description = allRequests[0].description;
      tempObj.thumbnail = allRequests[0].thumbnail;
      tempObj.jalaaliCreatedDate = allRequests[0].jalaaliCreatedDate;
      moment.locale('en');
      tempObj.jalaaliCreatedDate = momentJalaali(tempObj.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      tempObj.jalaaliUserFriendlyCreatedDate = moment(tempObj.createdAt).fromNow();
      tempObj.jalaaliUserFriendlyCreatedDate = moment(tempObj.createdAt).fromNow();
      tempObj.jalaaliFullUserFriendlyCreatedDate = tempObj.jalaaliCreatedDate + ' ' + tempObj.jalaaliUserFriendlyCreatedDate;
      if (allRequests[i].tags) {
        let tags = JSON.parse(allRequests[i].tags);
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
      tempObj2.id = allRequests[0].id;
      tempObj2.data = {};
      tempObj2.data.summary = tempObj;
      finalProducts.push(tempObj2);
    }
    // for (let definition of allRequests) {
    //   let allViews = 0;
    //   let allLikes = 0;
    //   let allDislikes = 0;
    //   let likedislikeviews = await Likedislikeview.find({
    //     modelId: definition.id,
    //     model: 'definitions'
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
    //   definition.views = allViews;
    //   definition.likes = allLikes;
    //   definition.dislikes = allDislikes;
    //   definition.thumbnail = sails.config.custom.apiUrl + "/files/definitionImage/" + definition.thumbnail;
    //   moment.locale('en');
    //   definition.jalaaliCreatedDate = momentJalaali(definition.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    //   definition.jalaaliUpdatedDate = momentJalaali(definition.updatedAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    //   moment.locale('fa');
    //   definition.jalaaliUserFriendlyCreatedDate = moment(definition.createdAt).fromNow();
    //   definition.jalaaliUserFriendlyUpdatedDate = moment(definition.updatedAt).fromNow();
    //   definition.jalaaliFullUserFriendlyCreatedDate = definition.jalaaliCreatedDate + ' ' + definition.jalaaliUserFriendlyCreatedDate;
    // }
    finalData.dataLength = allRequests.length;
    finalData.data = finalProducts;
    finalData.errorMessage = null;
    finalData.auth= true;
    return finalData;
  }

};
