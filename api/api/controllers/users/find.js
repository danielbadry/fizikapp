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
    let allUsers = [];
    if(Object.keys(JSON.parse(inputs.where)).length === 0)
    {
      au = await Users.find();
      allUsers = await Users.find()
      .skip(inputs.skip)
      .limit(inputs.limit)
      .sort([{createdAt :'DESC'}]);
dataLength = au.length;
    }
    else {
      let conditions = JSON.parse(inputs.where);
      au = await Users.find(
        {
          or : [
            {
              firstName:{contains: conditions.fullName.contains}
            },
            {
              lastName:{contains: conditions.fullName.contains}
            },
            {
              userName:{contains: conditions.fullName.contains}
            }
          ]
        }
      );
allUsers = await Users.find(
        {
          or : [
            {
              firstName:{contains: conditions.fullName.contains}
            },
            {
              lastName:{contains: conditions.fullName.contains}
            },
            {
              userName:{contains: conditions.fullName.contains}
            }
          ]
        }
      )
      .limit(inputs.limit)
      .skip(inputs.skip)
      .sort([{createdAt :'DESC'}]);
dataLength = au.length;
    }

    for (let user of allUsers) {
      user.fullName = user.firstName + ' ' + user.lastName;

      // fetch all purchases of this user
      user.totalPurchase = 2500;
      moment.locale('en');
      user.jalaaliRegisterDate = momentJalaali(user.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      user.jalaaliUserFriendlyRegisterDate = moment(user.createdAt, 'YYYYMMDD').fromNow();
      user.lastLogin = new Date();
      user.numberOfInvitation = 3;
      user.jalaaliUserFriendlyCreatedDate = moment(user.createdAt).fromNow();
      user.jalaaliFullUserFriendlyCreatedDate = user.jalaaliRegisterDate + ' ' + user.jalaaliUserFriendlyCreatedDate;
      user.thumbnail = sails.config.custom.apiUrl + '/files/usersImage/' + user.thumbnail;

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
    finalData.isAuthenticated = true;
    return finalData;

  }

};
