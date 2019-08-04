var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Find',


  description: 'Find productsquestions.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

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
        productsquestion.userInfo.thumbnail = 'http://localhost:1337/uploads/' + productsquestion.userInfo.thumbnail;
        productsquestion.userInfo.url = 'http://localhost:3000/#/users/' + productsquestion.userInfo.id + '/show';
      } else {
        productsquestion.userInfo = {};
        productsquestion.userInfo.thumbnail = 'http://localhost:1337/uploads/' + 'IMG_20190804_103448_895.jpg';
        productsquestion.userInfo.firstName = 'iman';
        productsquestion.userInfo.lastName = 'arghamy';
      }
      
    }
    return productsquestions;
  }


};
