var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Create',


  description: 'Create userinteraction',


  inputs: {

    message: {
      type: 'string'
    },
    
    parentId: {
      type: 'string'
    },
    
    modelId: {
      type: 'string'
    },
    
    model: {
      type: 'string'
    },
    
    userId: {
      type: 'string'
    },

    type: {
      type: 'string'
    }
    
  },


  exits: {

  },

  fn: async function (inputs) {
    let token = this.req.headers.authorization;
    let TokenArray = token.split(" ");
    let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
    let userId = decodedToken.id;

    return await Userinteractions.create({
      message: inputs.message,
      parentId: inputs.parentId,
      modelId: inputs.modelId,
      model: inputs.model,
      type: inputs.type,
      userId: userId,
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse()
    }).fetch();

  }


};
