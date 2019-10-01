module.exports = {


  friendlyName: 'Getuserquizresponse',


  description: 'Getuserquizresponse quizes.',


  inputs: {

    userId: {
      type: 'string'
    },
    
    model: {
      type: 'string'
    },
    
    modelId: {
      type: 'string'
    },
    
  },


  exits: {

  },


  fn: async function (inputs) {
    let isAttended = false;
    let quizes = await Quizes.find({
      where :{
        model : inputs.model,
        modelId: inputs.modelId
      }
    });
    
    // create array of quizes id

    // return quizes;
    let userQuizResponse = await Quizesanswer.find({
      where : {
        userId:inputs.userId,
        quizId: { in: ['5d930323b48e1a237842b9a6', '5d930328b48e1a237842b9a7', '5d93032cb48e1a237842b9a8'] }
      }
    });
    
    if (typeof userQuizResponse === 'object') {
      isAttended = true;
    }

    return {
      isAttended : isAttended,
      userQuizResponse : userQuizResponse
    };

  }


};
