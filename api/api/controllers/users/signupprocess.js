module.exports = {


  friendlyName: 'Signupprocess',


  description: 'Signupprocess users.',


  inputs: {

  },


  exits: {

  },

/*
TODO: i must update below algorithm
*/
  fn: async function (inputs) {

    let finalData = {};
    simpleDate = (date) => {
      let nd = date.split('T');
      return nd[0];
    };
    let dateList = [];
    let allUsers = await Users.find();
    for (user of allUsers) {
      if (!dateList.includes(simpleDate(user.createdAt))) {
        dateList.push(simpleDate(user.createdAt));
      }
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

    for (user of allUsers) {
      for (ba of baseArray) {
        if (simpleDate(user.createdAt) === ba.date) {
          ba.value ++;
        }
      }
    }
    finalData.dataLength = baseArray.length;
    finalData.data = baseArray;
    return finalData;

  }

};
