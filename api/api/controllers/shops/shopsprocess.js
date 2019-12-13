module.exports = {


  friendlyName: 'Shopsprocess',


  description: 'Shopsprocess shops.',


  inputs: {

  },


  exits: {

  },

  fn: async function (inputs) {
    let finalData = {};
    simpleDate = (date) => {
      let nd = date.split('T');
      return nd[0];
    };
    let dateList = [];
    let allShops = await Shops.find();
    for (shop of allShops) {
      if (!dateList.includes(simpleDate(shop.createdAt))) {
        dateList.push(simpleDate(shop.createdAt));
      }
      let sp = await Shoppingplans.findOne({
        id : shop.shoppingPlanId
      });
      shop.value = sp.secondPrise;
    }

    let baseArray = [];
    for (dl of dateList) {
      let temp = {
        date: dl,
        value: 0,
        id: 0
      }
      baseArray.push(temp);
    }

    for (shop of allShops) {
      for (ba of baseArray) {
        if (simpleDate(shop.createdAt) === ba.date) {
          ba.value = parseInt(ba.value) + shop.value;
        }
      }
    }
    finalData.dataLength = baseArray.length;
    finalData.data = baseArray;
    return finalData;
  }


};
