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
    
    let infoFromUsers = await Users.find({
      select:['id','createdAt']
    });
    
    let dateList = [];

    for (let d of infoFromUsers) {
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

    for (let i = 0 ; i < infoFromUsers.length ; i ++) {
      for (let j = 0 ; j < dateList.length ; j ++) {
        if ( dateList[j].date == infoFromUsers[i].createdAt) {
          dateList[j].value ++;
          dateList[j].id ++;
        }
      }
    }

    return dateList;

  }

};
