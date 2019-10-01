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

    return await Sciencechallengeresponse.create({
      sciencechallengeId: inputs.sciencechallengeId,
      userId: inputs.userId,
      userAnswerMessage: inputs.userAnswerMessage,
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse(),
      
    }).fetch();

  }


};