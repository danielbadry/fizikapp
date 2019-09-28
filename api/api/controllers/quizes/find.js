module.exports = {


  friendlyName: 'Find',


  description: 'Find quizes.',


  inputs: {
    
    model : {
      type : 'string'
    },
    
    modelId : {
      type : 'string'
    },

  },


  exits: {

  },


  fn: async function (inputs) {

    let quizes = await Quizes.find({
      isDeleted: false,
      model : inputs.model,
      modelId : inputs.modelId
    });

    for (let quiz of quizes) {
      let options = quiz.options;
      let finalOptions = [];
      for (let option of options) {
        
        if (!option.isDeleted) {
          finalOptions.push(option);
        }
        
      }
      quiz.options = finalOptions;
    }

    return quizes;

  }


};
