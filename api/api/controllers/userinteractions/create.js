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
    let TokenArray = token.split(' ');
    let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
    let userId = decodedToken.id;

    let user = await Users.findOne({
      id: userId
    });

    if (user.commentAuthorization)
    {
      let ui = await Userinteractions.create({
        message: inputs.message,
        parentId: inputs.parentId,
        modelId: inputs.modelId,
        model: inputs.model,
        type: inputs.type,
        userId: userId,
        createdAt : await sails.helpers.dateParse(),
        updatedAt : await sails.helpers.dateParse()
      }).fetch();

      let targetUserinteraction;
      if (inputs.parentId !== '') {
        // return ({'are':'are'});
        // save a record notify in message collection
        targetUserinteraction = await Userinteractions.findOne({
          id: inputs.parentId
        });
        // return targetUserinteraction;
        await Messages.create({
          createdAt : await sails.helpers.dateParse(),
          updatedAt : await sails.helpers.dateParse(),
          message: 'شخصی روی کامنت شما جواب داد',
          userId : targetUserinteraction.userId,
          isRead : false,
          isDeleted : false
        });
        //
      }
      let finalData = {};
      finalData.dataLength = 0;
      finalData.data = ui;
      finalData.errorMessage = '';
      finalData.auth= true;
      return finalData;
    } else {
      let finalData = {};
      finalData.dataLength = 0;
      finalData.data = [];
      finalData.errorMessage = 'اجازه ی کامنت گذاشتن ندارید';
      finalData.auth= true;
      return finalData;
    }
  }

};
