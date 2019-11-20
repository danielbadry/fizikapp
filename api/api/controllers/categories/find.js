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
    let rowId = inputs.rowId || '0';
    let allCategories = await Categories.find({
      isDeleted: false,
      parentId:rowId
    });

    for (let category of allCategories) {
      moment.locale('en');
      category.jalaaliCreatedDate = momentJalaali(category.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      category.jalaaliUserFriendlyCreatedDate = moment(category.createdAt).fromNow();
      category.fullJalaali = category.jalaaliCreatedDate + ' ' + category.jalaaliUserFriendlyCreatedDate;
      category.itemType = 'folder';
      category.thumbnail = sails.config.custom.apiUrl + '/files/productImage/folder.png';
    
      let allSubCategories = await Categories.find({
        where : {
          isDeleted: false,
          parentId: category.id
        }
      });
      for (let category of allSubCategories) {
        category.thumbnail = sails.config.custom.apiUrl + '/files/productImage/folder.png';
      }
      category.allSubCategories = allSubCategories;
    }

    let allProducts = await Products.find({
      where : {
        isDeleted: false,
        category: rowId
      }
    });

    for (let product of allProducts) {
      product.thumbnail = sails.config.custom.apiUrl + '/files/productImage/' + product.thumbnail;
    }
    
    finalData.Categories = allCategories;
    finalData.Products = allProducts; 

    return finalData;
    // return allCategories;
    // if (allProducts.length > 0)
    // for (let product of allProducts) {
    //   let p = JSON.parse(product.category);
    //   if (p.id == rowId) {
    //     product.itemType = 'product';
    //     product.thumbnail = sails.config.custom.apiUrl + '/files/productImage/' + product.thumbnail;
    //     moment.locale('en');
    //     product.jalaaliCreatedDate = momentJalaali(product.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
    //     moment.locale('fa');
    //     product.jalaaliUserFriendlyCreatedDate = moment(product.createdAt).fromNow();
    //     product.fullJalaali = product.jalaaliCreatedDate + ' ' + product.jalaaliUserFriendlyCreatedDate;
    //     allItems.push(product);
    //   }
    // }

    // finalData.dataLength = allItems.length;
    // finalData.data = allItems;
    // finalData.isAuthenticated = true;
    // return finalData;
  }

};
