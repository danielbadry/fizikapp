module.exports = {


  friendlyName: 'Financehistory',


  description: 'Financehistory users.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let shops = await Shops.find({
      userId : inputs.userId
    });

    let shoppingplans = await Shoppingplans.find();

    for (let i = 0; i< shops.length; i++) {
      for (let j = 0; j < shoppingplans.length; j++) {
        if (shops[i].shoppingPlanId === shoppingplans[j].id) {
          shops[i].shoppingPlanName = shoppingplans[j].type;
          shops[i].shoppingPlanFirstPrise = shoppingplans[j].firstPrise;
          shops[i].shoppingPlanSecondPrise = shoppingplans[j].secondPrise;
        }
      }
    }

    return shops;

  }


};
