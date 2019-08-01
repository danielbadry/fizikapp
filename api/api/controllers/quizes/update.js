module.exports = {


  friendlyName: 'Update',


  description: 'Update quizes.',


  inputs: {
    
    id : {
      type: 'string'
    },
    
    optionText : {
      type: 'string'
    },
    
    optionId : {
      type: 'string'
    },
    
    quizItemId : {
      type: 'string'
    },
    
    isAnswer : {
      type: 'boolean'
    }
    
  },

  exits: {

  },


  fn: async function (inputs) {

    let quizItem = await Quizes.findOne({
      id: inputs.id,
      isDeleted: false
    });

    let options = quizItem.options;
    let optionObject = {
      title : inputs.optionText,
      isAnswer: false,
      createdAt : '2019-07-28T17:56:29',
      updatedAt : '2019-07-28T17:56:29'
    }
    options.push(optionObject);

    let result = await Quizes.updateOne({
      id: inputs.id,
    })
    .set({
      options : options
    });

    return result;

  }


};
