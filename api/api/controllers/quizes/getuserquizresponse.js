var jwt = require('jsonwebtoken');
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
    let token = this.req.headers.authorization;
    let TokenArray = token.split(" ");
    let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
    let userId = decodedToken.id;

    let isAttended = false;
    let quizes = await Quizes.find({
      where :{
        model : inputs.model,
        modelId: inputs.modelId
      }
    });
    
    // create array of quizes id

    let quizesIds = [];
    for (let q of quizes) {
      quizesIds.push(q.id);
    }
    
    let userQuizResponse = await Quizesanswer.find({
      where : {
        userId:userId,
        quizId: { in: quizesIds }
      }
    });
    
    if (userQuizResponse.length) {
      isAttended = true;
    }

    return {
      isAttended : isAttended,
      userQuizResponse : userQuizResponse
    };

  }

};
