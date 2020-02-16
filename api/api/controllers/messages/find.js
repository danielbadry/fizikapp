var jwt = require('jsonwebtoken');
var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Find',


  description: 'Find messages.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    // let token = this.req.headers.authorization;
    // let TokenArray = token.split(" ");
    // let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
    // let userId = decodedToken.id;
    // let messages = await Messages.find({
    //   userId: userId
    // });
    // return messages;

    let token = this.req.headers.authorization;
    let TokenArray = token.split(' ');
    return jwt.verify(TokenArray[1], sails.config.custom.secret, async (err, decoded) => {
      if (err) {
        return({ auth: false, token: null, errorMessage:'error in reading messages', err:err });
      } else {
        let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
        let userId = decodedToken.id;
        let messages = await Messages.find({
          userId: userId,
        });
        for (message of messages) {
          moment.locale('en');
          message.jalaaliCreatedDate = momentJalaali(message.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
          moment.locale('fa');
          message.jalaaliUserFriendlyCreatedDate = moment(message.createdAt).fromNow();
          message.jalaaliFullUserFriendlyCreatedDate = message.jalaaliCreatedDate + ' ' + message.jalaaliUserFriendlyCreatedDate;
          message.senderName = 'از طرف مدیر';
        }
        return ({ auth: true, errorMessage:null, data:messages });
      }
    });

  }

};
