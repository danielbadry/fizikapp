module.exports = {


  friendlyName: 'All categories',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let allSubjects = Subjects.find();
    return allSubjects;

  }


};
