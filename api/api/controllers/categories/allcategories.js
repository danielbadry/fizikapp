module.exports = {


  friendlyName: 'All categories',


  description: '',


  inputs: {

    rowId: {
      type: 'string'
    },

    model: {
      type: 'string',
      required: false
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    var notRepeat = (obj, arr) => {
      for (let a of arr) {
        if (obj.id === a.id) {
          return false;
        }
      }
      return true;
    };

    let catId = inputs.rowId;
    let allCategories = await Categories.find();
    let finalArray = [];

    let baseCat = await Categories.findOne({
      id : inputs.rowId
    });

    for (let c of allCategories) {
      if (c.id === catId) {
        finalArray.push(c);
      }
    }


    for (let c of allCategories) {
      if (c.parentId === catId) {
        finalArray.push(c);
      }
    }

    for (let p of finalArray) {
      for(let c of allCategories) {
        if(c.parentId === p.id) {
          if(notRepeat(c,finalArray)) {
            finalArray.push(c);
          }
        }
      }
    }

    let allEntities = [];
    // allEntities = await Products.find();
    switch (inputs.model) {
      case 'products':
        allEntities = await Products.find();
        break;
      case 'definitions' :
        allEntities = await Definitions.find();
        break;
    }

    let urlModel = null;
    let thumbnailAddress = null;
    let finalDefinitions = [];

    for (let fi of finalArray) {
      for (let df of allEntities) {
        if (df.category === fi.id) {
          df.parentId = df.category;
          switch (inputs.model) {
            case 'definitions':
              urlModel = 'definition/';
              thumbnailAddress = '/files/definitionImage/';
              break;
            case 'products':
              urlModel = 'product/';
              thumbnailAddress = '/files/productImage/';
              break;
          }

          df.url = urlModel + df.id;
          df.thumbnail = sails.config.custom.apiUrl + thumbnailAddress + df.thumbnail;
          finalDefinitions.push(df);
        }
      }
    }

    var children = finalArray.concat(finalDefinitions);
    children.sort((a, b) => (parseInt(a.priority) > parseInt(b.priority)) ? 1 : -1);
    let finalData = {};
    finalData.auth = true;
    finalData.data = {};
    finalData.data.baseCat = baseCat;
    finalData.data.data = children;
    return finalData;

  }


};
