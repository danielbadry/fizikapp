module.exports = {


  friendlyName: 'Numberofwatchedvideos',


  description: 'Numberofwatchedvideos users.',


  inputs: {

    userId : {
      type : 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    let allCategories;

    findParent = async (item) => {
      let categoryId = await Products.findOne({
        id : item.modelId
      });
      categoryId = categoryId.category;
      allCategories = await Categories.find({
        isDeleted : false
      });
      let ids = [];

      for (let i = 0; i < 5; i ++) {
        for (let j = 0; j < allCategories.length; j ++) {
          if (allCategories[j].id === categoryId ) {
            ids.push(allCategories[j].parentId);
            categoryId = allCategories[j].parentId;
          }
        }
      }
      return ids[ids.length -2];
      // console.info(ids[ids.length -2]);
    };

    let roots = await Categories.find({
      parentId : '0'
    });

    var data = [];
    

    for (let root of roots) {
      let tempObj = {};
      tempObj.country = root.name;
      tempObj.id = root.id;
      tempObj.visits = 0;
      data.push(tempObj);
    }

    // return data;

    let allViews = await Watchedvideos.find({
      userId : inputs.userId
    });

    let parentId;

    for (view of allViews) {
      parentId = findParent(view);
      parentId.then( function(result) {
        for (rt of data) {
            if (rt.id == result) {
              rt.visits = rt.visits + 1;
              
            }
          }
          
      });
      return data;
    }

    // return data;
  }

};
