module.exports = {


  friendlyName: 'All categories',


  description: '',


  inputs: {
    rowId: {
      type: 'string'
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

    return finalArray;

  }


};
