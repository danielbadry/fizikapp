var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Find',


  description: 'Find definitions.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let finalData = {};
    let dataLength = await Definitions.find();

    let allDefinitions = await Definitions.find()
    .limit(inputs.limit)
    .skip(inputs.skip)
    ;
    for (let definitions of allDefinitions) {
      moment.locale('en');
      definitions.jalaaliCreatedDate = momentJalaali(definitions.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      definitions.jalaaliUserFriendlyCreatedDate = moment(definitions.createdAt).fromNow();
    }
    finalData.dataLength = dataLength.length;
    finalData.data = allDefinitions;
    return finalData;

  }


};
