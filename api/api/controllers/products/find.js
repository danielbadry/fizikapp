var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Find',


  description: 'Find products.',


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
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    let finalData = {};
    let tagsArray = [];
    let dataLength = await Products.find();
    let allProducts = await Products.find()
    .limit(inputs.limit)
    .skip(inputs.skip)
    ;
    for (let product of allProducts) {
        product.thumbnail = "http://localhost:1337/files/productImage/" + product.thumbnail;
        product.hasQuiz = false;
        moment.locale('en');
        product.jalaaliCreatedDate = momentJalaali(product.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
        moment.locale('fa');
        product.jalaaliUserFriendlyCreatedDate = moment(product.createdAt).fromNow();   
        product.jalaaliUserFriendlyCreatedDate = moment(product.createdAt).fromNow();
        product.jalaaliFullUserFriendlyCreatedDate = product.jalaaliCreatedDate + ' ' + product.jalaaliUserFriendlyCreatedDate;
        
        //  tidy up tags
        let tags = JSON.parse(product.tags);
        tagsArray = [];
        for (let tag of tags) {
          let tagElement = await Tags.findOne({
            id: tag.id
          });
          tagsArray.push(tagElement);
        }
        
        product.tagsArray = tagsArray;
    }

    finalData.dataLength = dataLength.length;
    finalData.data = allProducts;
    return finalData;

  }


};
