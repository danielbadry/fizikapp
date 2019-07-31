module.exports = {


  friendlyName: 'Updateone',


  description: 'Updateone quizes.',


  inputs: {

    id :{
      type: 'string',
      required : false
    },

  },


  exits: {

  },


  fn: async function (inputs) {

    return 'mil';
    let result = await Quizes.updateOne({
      id: inputs.id,
    })
    .set({
      question: inputs.question
    });

    return result;

  }


};
