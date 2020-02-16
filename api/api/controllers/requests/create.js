var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Create',


  description: 'Create requests.',


  inputs: {

    parentId : {
      type: 'string'
    },

    message : {
      type: 'string'
    },

    title : {
      type: 'string'
    },

    tags : {
      type: 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {
    let token = this.req.headers.authorization;
    let TokenArray = token.split(' ');
    let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
    let userId = decodedToken.id;
    let request = await Requests.create({
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse(),
      parentId : inputs.parentId,
      message : inputs.message,
      title : inputs.title,
      userId : userId,
      tags : inputs.tags,
      isDeleted : false,

    }).fetch();
    let finalData = {};
    finalData.dataLength = 1;
    finalData.data = request;
    finalData.auth= true;
    finalData.errorMessage = null;
    return finalData;
  }


};
