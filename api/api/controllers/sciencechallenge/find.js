module.exports = {


  friendlyName: 'Find',


  description: 'Find sciencechallenge.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let finalData = {};
    
    let dataLength = await Sciencechallenge.find();
    let allSciencechallenge = await Sciencechallenge.find()
    .limit(inputs.limit)
    .skip(inputs.skip)
    ;

    finalData.dataLength = dataLength.length;
    finalData.data = allSciencechallenge;
    return finalData;

  }


};
