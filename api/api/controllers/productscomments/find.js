var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Find',


  description: 'Find productscomments.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let productscomments = await Productscomments.find({
      where : {
        isDeleted : false,
        productId: inputs.id
      }
    });
    for (let productscomment of productscomments) {
      moment.locale('en');
      productscomment.jalaaliCreatedDate = momentJalaali(productscomment.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      productscomment.jalaaliUserFriendlyCreatedDate = moment(productscomment.createdAt).fromNow();

      if (productscomment.userId) {
        let user = await Users.find({
          where : {
            id: productscomment.userId
          }
        });
        productscomment.userInfo = user[0];
        productscomment.userInfo.thumbnail = 'http://localhost:1337/uploads/' + productscomment.userInfo.thumbnail;
        productscomment.userInfo.url = 'http://localhost:3000/#/users/' + productscomment.userInfo.id + '/show';
      } else {
        productscomment.userInfo = {};
        productscomment.userInfo.thumbnail = 'http://localhost:1337/uploads/' + 'IMG_20190804_103448_895.jpg';
        productscomment.userInfo.firstName = 'iman';
        productscomment.userInfo.lastName = 'arghamy';
      }
      
    }
    return productscomments;

  }


};
