module.exports = {


  friendlyName: 'Create',


  description: 'Create quizesanswer.',


  inputs: {
    answers : {
      type : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    let answers = JSON.parse(inputs.answers);
    for (let an of answers) {
      an.createdAt = await sails.helpers.dateParse();
      an.updatedAt = await sails.helpers.dateParse();
      an.isDeleted = false;
    }
    return await Quizesanswer.createEach(answers).fetch();
  }

};
