module.exports = {


  friendlyName: 'Shoppinglevel',


  description: 'Shoppinglevel users.',


  inputs: {

    userId : {
      type : 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {
    let sum = 0;
    let shops = await Shops.find({
      userId : inputs.userId
    });

    let shoppingplans = await Shoppingplans.find();

    for (let i = 0; i< shops.length; i++) {
      for (let j = 0; j < shoppingplans.length; j++) {
        if (shops[i].shoppingPlanId === shoppingplans[j].id) {
          sum = sum + parseInt(shoppingplans[j].secondPrise);
        }
      }
    }

    return sum;

  }


};
