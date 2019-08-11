module.exports = {

  friendlyName: 'Sendfcoin',

  description: 'Sendfcoin users.',

  inputs: {
    fCoin : {
      type: 'string'
    },
    userId : {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let user = await Users.find({
      where: {
        id: inputs.userId
      }
    });
    let currentFcoin = parseInt(user[0].fCoin) + parseInt(inputs.fCoin);
    let result = await Users.updateOne({
      id: inputs.userId
    })
    .set({
      fCoin: currentFcoin
    });
    return result;
  }

};
