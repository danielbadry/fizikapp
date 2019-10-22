var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {

  friendlyName: 'Findone',

  description: 'Findone products.',

  inputs: {

    userId :{
      type: 'string'
    },
    
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
    let tagsArray = [];
    let summary = await Products.findOne({
      id: inputs.id
    });
    
    if (inputs.userId) {
      // find video status for this user
      let userVideoStatus = await Watchedvideos.findOne({
        userId : inputs.userId,
        modelId: inputs.modelId,
        model: inputs.model
      });
      
      if (userVideoStatus && typeof userVideoStatus === 'object' && userVideoStatus.constructor === Object)
        summary.startTime = userVideoStatus.startTime;
    }

    /*
    TODO: check for user has charge
    */

    if (true) {
      summary.videoAddress = sails.config.custom.apiUrl + '/files/productFiles/' + summary.filesrc;
    }
    else {
      summary.filesrc = null;
      summary.videoAddress = null;
    }
      
    moment.locale('en');
    summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    moment.locale('fa');
    summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
    summary.thumbnail = sails.config.custom.apiUrl + "/files/productImage/" + summary.thumbnail;
    
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
      tags: [],
      thumbnail: summary.thumbnail
    });
  }

};
