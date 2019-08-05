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
    
    flag : {
      type: 'string'
    },
    
    value : {
      type: 'boolean'
    },
    
    isOpen : {
      type: 'boolean'
    },
    
  },

  exits: {

  },

  fn: async function (inputs) {

    let quizItem = await Quizes.findOne({
      id: inputs.id,
      isDeleted: false
    });
    let options = quizItem.options;


    // if we want to set the isAnswer flag
    if (inputs.flag == 'isAnswer') {
      for(let option of options) {
        if (option.id == inputs.optionId) {
          option.isAnswer = inputs.value
        } else {
          option.isAnswer = !inputs.value
        }
      }
    }
  
    //  if we want to add another option
    if (inputs.optionText) {
      let optionObject = {
        id: 'xxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 5 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(5);
        }),
        title : inputs.optionText,
        isAnswer: false,
        isDeleted: false,
        createdAt : '2019-07-28T17:56:29',
        updatedAt : '2019-07-28T17:56:29'
      }
      options.push(optionObject);
    }

    // if we want to delete an option
    if (inputs.flag == 'delete') {
      for(let option of options) {
        if (option.id == inputs.optionId) {
          option.isDeleted = true;
        }
      }
    }


    // output
    let result = await Quizes.updateOne({
      id: inputs.id,
    })
    .set({
      options : options,
      isOpen: inputs.isOpen
    });

    return result;

  }


};
