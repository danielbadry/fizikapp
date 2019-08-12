var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Find',


  description: 'Find users.',


  inputs: {
    limit: {
      type: 'number'
    },
    
    skip: {
      type: 'number'
    },

    sort: {
      type: 'string'
    },
    
    where: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    let finalData = {};
    let allUsers;
    // let dataLength = await Users.find();
    if (inputs.where)
    {
      // return inputs.where
      allUsers = await Users.find(
        {
          where: JSON.parse(inputs.where)
        }
      )
      .limit(inputs.limit)
      .skip(inputs.skip)
      ;
      dataLength = allUsers.length;
    }

    else {
      allUsers = await Users.find()
      .skip(inputs.skip)
      ;
      dataLength = allUsers.length;
    }

    for (let user of allUsers) {
        user.fullName = user.firstName + ' ' + user.lastName;

        // fetch all purchases of this user
        user.totalPurchase = 2500;
        moment.locale('en');
        user.jalaaliRegisterDate = momentJalaali(user.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
        moment.locale('fa');
        user.jalaaliUserFriendlyRegisterDate = moment(user.createdAt, "YYYYMMDD").fromNow();
        user.lastLogin = new Date();
        user.numberOfInvitation = 3;
        user.jalaaliUserFriendlyCreatedDate = moment(user.createdAt).fromNow();
        user.jalaaliFullUserFriendlyCreatedDate = user.jalaaliRegisterDate + ' ' + user.jalaaliUserFriendlyCreatedDate;
        user.thumbnail = "http://localhost:1337/files/usersImage/" + user.id + '.jpg';
        
        let lastShop = await Shops.find({
          where: {
            userId: user.id
          }
        })
        .sort('createdAt DESC')
        .limit(1);
        if (lastShop.length){
          let id = lastShop[0].shoppingPlanId;
          let res = await Shoppingplans.find({
            where: {
              id: id
            }
          });
          user.subType = res[0].type;
        }
        
    }
    finalData.dataLength = dataLength;
    finalData.data = allUsers;
    return finalData;

  }

};
