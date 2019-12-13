module.exports = {


  friendlyName: 'Shoppingplanspurchasevelocity',


  description: 'Shoppingplanspurchasevelocity shoppingplans.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    let finalData = {};
    let allShoppingplans = await Shoppingplans.find();
    let baseArray = [];
    for (let shoppingplan of allShoppingplans) {
      let tempObj = {
        country: shoppingplan.type,
        value: 0,
        shoppingplanId : shoppingplan.id,
        id : shoppingplan.id
      };
      baseArray.push(tempObj);
    }

    let allShops = await Shops.find();
    for (let shop of allShops) {
      for (let ba of baseArray) {
        if (shop.shoppingPlanId === ba.shoppingplanId) {
          ba.value ++;
        }
      }
    }

    finalData.dataLength = baseArray.length;
    finalData.data = baseArray;
    return finalData;

  }


};
