var jwt = require('jsonwebtoken');
var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {

  friendlyName: 'Findone',

  description: 'Findone sciencechallenge.',

  inputs: {

    id :{
      type: 'string'
    }, 

  },

  exits: {

  },

  fn: async function (inputs) {
    // return(this.req.headers.authorization);
    // let token;
    // return this.res.json(typeof(this.req.headers.authorization));
    if(typeof(this.req.headers.authorization) !== 'undefined') {
    token = this.req.headers.authorization;
    let TokenArray = token.split(" ");
    
    if (TokenArray[1] !== 'null')
    {
      let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
      var userId = decodedToken.id;

      let summary = await Sciencechallenge.findOne({
        id: inputs.id
      });
      
      var isUserAnswered = await Sciencechallengeresponse.findOne({
        sciencechallengeId : inputs.id,
        userId: userId
      });

      if (typeof isUserAnswered === 'object' && isUserAnswered.constructor === Object) {
        isUserAnswered = {
          data:isUserAnswered,
          isUserAnswered:true
        }
      } else {
        isUserAnswered = {
          data:{},
          isUserAnswered:false
        }
      }
      
      // find video status for this user
      let userVideoStatus = await Watchedvideos.findOne({
        // userId : '5d73564134abe01014969d96',
        modelId: inputs.id,
      });

      if (userVideoStatus && typeof userVideoStatus === 'object' && userVideoStatus.constructor === Object)
        summary.startTime = userVideoStatus.startTime;
        summary.videoAddress = sails.config.custom.apiUrl + '/files/sciencechallengeFiles/' + summary.mainFileSrc;
        moment.locale('en');
        summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
        moment.locale('fa');
        summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
        summary.thumbnail = sails.config.custom.apiUrl + "/files/sciencechallengeImage/" + summary.thumbnail;
    
        return ({
          id: inputs.id,
          summary,
          thumbnail: summary.thumbnail,
          isUserAnswered: isUserAnswered,
          isAuthenticated: true
        });

    } else {
      let summary = await Sciencechallenge.findOne({
        id: inputs.id
      });
        
      moment.locale('en');
      summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
      summary.thumbnail = sails.config.custom.apiUrl + "/files/sciencechallengeImage/" + summary.thumbnail;
      return ({
        id: inputs.id,
        summary,
        thumbnail: summary.thumbnail,
        isUserAnswered: {
          data:{},
          isUserAnswered:false
        },
        isAuthenticated: false
      });
    }
  
    } else {
      
      let summary = await Sciencechallenge.findOne({
        id: inputs.id
      });
        
      moment.locale('en');
      summary.jalaaliCreatedDate = momentJalaali(summary.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      summary.jalaaliUserFriendlyCreatedDate = moment(summary.createdAt).fromNow();
      summary.thumbnail = sails.config.custom.apiUrl + "/files/sciencechallengeImage/" + summary.thumbnail;
   
      return ({
        id: inputs.id,
        summary,
        thumbnail: summary.thumbnail,
        isUserAnswered: {
          data:{},
          isUserAnswered:false
        },
        isAuthenticated: false
      });

    }
    

  }

};
