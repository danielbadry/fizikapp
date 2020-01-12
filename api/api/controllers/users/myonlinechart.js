var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Myonlinechart',


  description: 'Myonlinechart users.',


  inputs: {

  },


  exits: {

  },

/*
TODO: i must update below algorithm
*/
  fn: async function (inputs) {

    let token = this.req.headers.authorization;
    let TokenArray = token.split(' ');
    let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
    let userId = decodedToken.id;

    let userOnlineTimes = await Onlineoffline.find({
      userId : userId
    });

    let finalData = {};
    finalData.data = [];
    for (userOnlineTime of userOnlineTimes) {
      let temp = {
        date: userOnlineTime.createdAt,
        id: 0,
        value: userOnlineTime.seconds
      };
      finalData.data.push(temp);
    }
    finalData.dataLength = userOnlineTimes.length;
    return finalData;

  }

};
