module.exports = {


  friendlyName: 'Create',


  description: 'Create quizes.',


  inputs: {
    question :{
      type : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    return await Quizes.create({
      question: inputs.question,
      createdAt : await sails.helpers.dateParse()
    }).fetch();

  }


};
