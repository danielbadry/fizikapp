module.exports = {


  friendlyName: 'Listofonlines',


  description: 'Listofonlines users.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let onlineUsers = await Users.find({
      isOnline: true
    });

    return onlineUsers.length;

  }


};
