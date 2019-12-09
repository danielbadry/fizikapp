module.exports = {


  friendlyName: 'All categories',


  description: '',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let allSubjects = await Subjects.find();
    for (let subject of allSubjects) {
      subject.label = subject.name;
      subject.value = subject.id;
    }
    return allSubjects;

  }


};
