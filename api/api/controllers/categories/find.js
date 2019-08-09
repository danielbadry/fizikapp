var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {

  friendlyName: 'Find',

  description: 'Find categories.',

  inputs: {
    rowId: {
      type: 'string',
      required: false
    },
  },

  exits: {

  },

  fn: async function (inputs) {
    let finalData = {};
    let dataLength = await Categories.find();
    
    let allItems = await Categories.find({
      where: {
        parentId:inputs.rowId,
        isDeleted: false
      }
    });

    for (let item of allItems) {
      moment.locale('en');
      item.jalaaliCreatedDate = momentJalaali(item.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      item.jalaaliUserFriendlyCreatedDate = moment(item.createdAt).fromNow();
      item.fullJalaali = item.jalaaliCreatedDate + ' ' + item.jalaaliUserFriendlyCreatedDate;
      item.itemType = 'folder';
      item.thumbnail = 'http://localhost:1337/uploads/folder.png';
    }

    let allProducts = await Products.find({
      where : {
        isDeleted: false
      }
    });

    for (let product of allProducts) {
      let p = JSON.parse(product.category);
      if (p.id == inputs.rowId) {
        product.itemType = 'product';
        product.thumbnail = 'http://localhost:1337/uploads/5d3c65cc823c3d1be8f529d2.jpg';
        allItems.push(product);
      }
    }

    finalData.dataLength = allItems.length;
    finalData.data = allItems;
    return finalData;
  }

};
