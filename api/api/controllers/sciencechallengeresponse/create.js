var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Create',


  description: 'Create sciencechallengeresponse.',


  inputs: {

    userId :{
      type: 'string',
      required : false
    },
    
    sciencechallengeId :{
      type: 'string',
      required : false
    },

    userAnswerMessage :{
      type: 'string',
      required : false
    },

  },


  exits: {

  },


  fn: async function (inputs) {
    let token = this.req.headers.authorization;
    let TokenArray = token.split(" ");
    let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
    let userId = decodedToken.id;

    return await Sciencechallengeresponse.create({
      sciencechallengeId: inputs.sciencechallengeId,
      userId: userId,
      userAnswerMessage: inputs.userAnswerMessage,
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse(),
      
    }).fetch();

  }


};
