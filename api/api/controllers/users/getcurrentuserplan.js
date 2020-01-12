var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Getcurrentuserplan',


  description: 'Getcurrentuserplan users.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let token = this.req.headers.authorization;
    let TokenArray = token.split(' ');
    return jwt.verify(TokenArray[1], sails.config.custom.secret, async (err, decoded) => {
      if (err) {
        return({

        });
      } else {
        let userShops = await Shops.find({
          userId : decoded.id
        });
        
        let userShopsIDs = [];
        for(usp of userShops) {
          userShopsIDs.push(usp.shoppingPlanId);
        }
        let allUserShoppingPlan = await Shoppingplans.find({
          id: { in: userShopsIDs }
        });
        let tempData = {};
        let finalData = [];
        for (userShop of userShops) {
          for (ausp of allUserShoppingPlan) {
            if (userShop.shoppingPlanId === ausp.id) {
              tempData = {};
              tempData.shoppingPlanName = ausp.type;
              tempData.duration = ausp.duration;
              tempData.firstPrise = ausp.firstPrise;
              tempData.secondPrise = ausp.secondPrise;
              tempData.fPointPrice = ausp.fPointPrice;
              tempData.thumbnail = ausp.thumbnail;
              tempData.purchasedDate = userShop.createdAt;
              var startDate = new Date(userShop.createdAt);
              var day = 60 * 60 * 24 * 1000;
              var endDate = new Date(startDate.getTime() + day);
              var currentTime = await sails.helpers.dateParse();
              tempData.currentTime = new Date(currentTime);
              tempData.endDate = endDate;
              let res = new Date(currentTime) > endDate;
              tempData.status = res;
              if (res) {
                tempData.status = 'expire';
              } else {
                tempData.status = 'unexpire';
              }
              finalData.push(tempData);
            }
          }
        }

        return ({ auth: true, errorMessage:null, data:finalData});
      }
    });

  }

};
