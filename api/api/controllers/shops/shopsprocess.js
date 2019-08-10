module.exports = {


  friendlyName: 'Shopsprocess',


  description: 'Shopsprocess shops.',


  inputs: {

  },


  exits: {

  },

  fn: async function (inputs) {
    let finalData = {};
    let allShops = await Shops.find();
    let dateList = [];

    for (let d of allShops) {
      let shoppingPlanInfo = await Shoppingplans.find({
        where : {
          id: d.shoppingPlanId
        }
      });
      shoppingPlanInfo = shoppingPlanInfo[0];
      d.totalPrice = shoppingPlanInfo.secondPrise;
      if (!dateList.includes(d.createdAt))
        dateList.push(d.createdAt);
    }

    uniq = [...new Set(dateList)];
    uniq.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a) - new Date(b);
    });

    dateList = [];
    for (let d of uniq) {
      let tempObject = {
        date : d,
        value : 0,
        id:0
      };
      dateList.push(tempObject);
    }

    for (let i = 0 ; i < allShops.length ; i ++) {
      for (let j = 0 ; j < dateList.length ; j ++) {
        if ( dateList[j].date == allShops[i].createdAt) {
          dateList[j].value = Number(dateList[j].value) + Number(allShops[i].totalPrice);
          dateList[j].id ++;
        }
      }
    }

    finalData.dataLength = allShops.length;
    finalData.data = dateList;
    return finalData;
  }


};
