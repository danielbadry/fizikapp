var jwt = require('jsonwebtoken');
module.exports = {
  friendlyName: 'Setuserwatchstatus',

  description: 'Setuserwatchstatus watchedvideos.',

  inputs: {
    
    modelId:{
      type: 'string'
    },
    
    startTime:{
      type: 'string'
    },
    
    model:{
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

    let alreadyRecord = await Watchedvideos.find({
      model:inputs.model,
      modelId:inputs.modelId,
      userId:userId
    });

    if (alreadyRecord.length) {
      return await Watchedvideos.update({
        model:inputs.model,
        modelId:inputs.modelId,
        userId:userId
      })
      .set({
        startTime:inputs.startTime,
        createdAt : await sails.helpers.dateParse(),
        updatedAt : await sails.helpers.dateParse(),
      })
      .fetch();
    } else {
      return await Watchedvideos.create({
        userId: userId,
        model: inputs.model,
        modelId: inputs.modelId,
        startTime: inputs.startTime,
        createdAt : await sails.helpers.dateParse(),
        updatedAt : await sails.helpers.dateParse(),
  
      }).fetch();
    }

  }

};
