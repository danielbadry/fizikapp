module.exports = {


  friendlyName: 'Useronlinechart',


  description: 'Useronlinechart users.',


  inputs: {
    id:{
      type:'string'
    },
  },


  exits: {

  },


  fn: async function (inputs) {

    let userOnlineTimes = await Onlineoffline.find({
      userId : inputs.id
    });

    let finalData = {};
    finalData.data = [];
    for (userOnlineTime of userOnlineTimes) {
      let temp = {
        date: userOnlineTime.createdAt,
        name: 0,
        value: userOnlineTime.seconds
      };
      finalData.data.push(temp);
    }
    finalData.dataLength = userOnlineTimes.length;
    return finalData;

  }


};
