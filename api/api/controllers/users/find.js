module.exports = {


  friendlyName: 'Find',


  description: 'Find users.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let allUsers = await Users.find();
    for (let d of allUsers) {
        d.fullName = d.firstName + ' ' + d.lastName;
        d.totalPurchase = 2500;
        d.lastLogin = new Date();
        d.numberOfInvitation = 3;
    }
    return allUsers;

  }


};
