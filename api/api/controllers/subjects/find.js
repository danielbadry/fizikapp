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
    let allCategories = await Subjects.find({
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

      let allSubCategories = await Subjects.find({
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

    let data = allCategories.concat(allProducts);
    data.sort((a, b) => (parseInt(a.priority) > parseInt(b.priority)) ? 1 : -1);

    finalData.Categories = allCategories;
    finalData.Products = allProducts;
    finalData.data = data;

    return finalData;

  }

};
