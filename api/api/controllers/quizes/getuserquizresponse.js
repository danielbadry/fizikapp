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
        quizId: { in: ['5d92e40633263b17bc5e1c84', '5d92e43d33263b17bc5e1c85', '5d92e47033263b17bc5e1c86'] }
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
