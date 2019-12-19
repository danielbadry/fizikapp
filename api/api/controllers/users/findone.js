var jwt = require('jsonwebtoken');
var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {


  friendlyName: 'Findone',


  description: 'Findone users.',


  inputs: {
    mobile :{
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let token = this.req.headers.authorization;
    return token;
    let TokenArray = token.split(" ");
    let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
    let userId = decodedToken.id;

    let user = await Users.findOne({
      id: userId,
      isDeleted : false
    });
    
    moment.locale('en');
    user.jalaaliCreatedDate = momentJalaali(user.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    moment.locale('fa');
    user.jalaaliUserFriendlyCreatedDate = moment(user.createdAt).fromNow();
    user.jalaaliFullUserFriendlyCreatedDate = user.jalaaliCreatedDate + ' ' + user.jalaaliUserFriendlyCreatedDate;
    return user;

  }


};
