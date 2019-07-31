module.exports = {


  friendlyName: 'Create',


  description: 'Create quizes.',


  inputs: {
    question :{
      type : 'string'
    },
    options :{
      type : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    return await Quizes.create({
      question: inputs.question,
      options:[],
      createdAt : await sails.helpers.dateParse()
    }).fetch();

  }


};
