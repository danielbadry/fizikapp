module.exports = {


  friendlyName: 'Create',


  description: 'Create favorites.',


  inputs: {

    modelId : {
      type: 'string'
    },
    
    model : {
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
      await Favorites.create({
        createdAt : await sails.helpers.dateParse(),
        updatedAt : await sails.helpers.dateParse(),
        userId : userId,
        model : inputs.model,
        modelId : inputs.modelId,

    });
      return await Favorites.find();

  }


};
