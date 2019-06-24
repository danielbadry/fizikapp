module.exports = {


  friendlyName: 'Shopsprocess',


  description: 'Shopsprocess shops.',


  inputs: {

  },


  exits: {

  },

  fn: async function (inputs) {
    let infoFromShops = await Shops.find();
    let dateList = [];

    for (let d of infoFromShops) {
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

    for (let i = 0 ; i < infoFromShops.length ; i ++) {
      for (let j = 0 ; j < dateList.length ; j ++) {
        if ( dateList[j].date == infoFromShops[i].createdAt) {
          dateList[j].value = Number(dateList[j].value) + Number(infoFromShops[i].totalPrice);
          dateList[j].id ++;
        }
      }
    }

    return dateList;
  }


};
