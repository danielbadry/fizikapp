module.exports = {


  friendlyName: 'Signupprocess',


  description: 'Signupprocess users.',


  inputs: {

  },


  exits: {

  },


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

    for (let i = 0; i< infoFromUsers.length ; i ++) {
      if (dateList[i] == )
    }

    // let data = [
    //   {
    //     date : 'Mon Jan 01 2018 00:00:00 GMT+0330 (Iran Standard Time)',
    //     value : 17
    //   },
    //   {
    //     date : 'Tue Jan 02 2018 00:00:00 GMT+0330 (Iran Standard Time)',
    //     value : 25
    //   },
    //   {
    //     date : 'Wed Jan 03 2018 00:00:00 GMT+0330 (Iran Standard Time)',
    //     value : 27
    //   },
    // ];

    return dateList;

  }

};
