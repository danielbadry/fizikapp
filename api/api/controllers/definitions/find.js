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
      // return '2';
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
    
    for (let request of allRequests) {
      request.thumbnail = "http://localhost:1337/files/definitionImage/" + request.thumbnail;
      moment.locale('en');
      request.jalaaliCreatedDate = momentJalaali(request.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      request.jalaaliUpdatedDate = momentJalaali(request.updatedAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      request.jalaaliUserFriendlyCreatedDate = moment(request.createdAt).fromNow();
      request.jalaaliUserFriendlyUpdatedDate = moment(request.updatedAt).fromNow();
      request.jalaaliFullUserFriendlyUpdatedDate = request.jalaaliUpdatedDate + ' ' + request.jalaaliUserFriendlyUpdatedDate;
    }
    finalData.dataLength = allRequests.length;
    finalData.data = allRequests;
    return finalData;
  }

};
