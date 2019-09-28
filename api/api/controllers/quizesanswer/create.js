module.exports = {


  friendlyName: 'Create',


  description: 'Create quizesanswer.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    return await Quizesanswer.create({
      quizId: '11111111111111',
      userId: '11111111111111',
      answerId: '10236',
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse(),
      isDeleted : false
    }).fetch();

  }


};
