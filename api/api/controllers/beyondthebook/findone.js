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
    let token = this.req.headers.authorization;
    let TokenArray = token.split(" ");
    let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
    let userId = decodedToken.id;

    let tagsArray = [];
    let summary = await Beyondthebook.findOne({
      id: inputs.id
    });
    
    if (userId) {
      // find video status for this user
      let userVideoStatus = await Watchedvideos.findOne({
        userId : userId,
        modelId: inputs.id,
        model: 'beyondthebooks'
      });
      
      if (userVideoStatus && typeof userVideoStatus === 'object' && userVideoStatus.constructor === Object)
        summary.startTime = userVideoStatus.startTime;
    }

    /*
    TODO: check for user has charge
    */

    if (true) {
      summary.videoAddress = sails.config.custom.apiUrl + '/files/beyondthebookFiles/' + summary.filesrc;
    }
    else {
      summary.filesrc = null;
      summary.videoAddress = null;
    }
      
    moment.locale('en');
    summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    moment.locale('fa');
    summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
    summary.thumbnail = sails.config.custom.apiUrl + "/files/beyondthebookImage/" + summary.thumbnail;
    
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
      thumbnail: summary.thumbnail,
      isAuthenticated: true
    });
  }

};
