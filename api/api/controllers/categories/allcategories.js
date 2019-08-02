module.exports = {


  friendlyName: 'All categories',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let allCategories = Categories.find();
    return allCategories;

  }


};
