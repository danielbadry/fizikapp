var moment = require('moment');
var momentJalaali = require('moment-jalaali');

module.exports = {

  friendlyName: 'Findone',

  description: 'Findone products.',

  inputs: {

    id :{
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

      let user = await Users.find({
        where : {
          id: productsquestion.userId
        }
      });
      productsquestion.userInfo = user[0];
      productsquestion.userInfo.thumbnail = 'http://localhost:1337/uploads/' + productsquestion.userInfo.thumbnail;
    }
    // let tags = JSON.parse(summary.tags);
    // for (let tag of tags) {
    //   let tagElement = await Tags.findOne({
    //     id: tag.id
    //   });
    //   tagsArray.push(tagElement);
    // }

    return ({
      id: inputs.id,
      summary,
      productsquestions,
      tags: []
    });

  }

};
