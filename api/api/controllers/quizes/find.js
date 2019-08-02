module.exports = {


  friendlyName: 'Find',


  description: 'Find quizes.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let quizes = await Quizes.find({
      isDeleted: false
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
