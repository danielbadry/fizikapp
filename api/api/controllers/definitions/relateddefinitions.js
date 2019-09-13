module.exports = {


  friendlyName: 'Relateddefinitions',


  description: 'Relateddefinitions definitions.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    let allDefinitions = await Definitions.find();
    return allDefinitions;
  }

};
