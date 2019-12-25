var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Create',


  description: 'Create favorites.',


  inputs: {

    id : {
      type: 'string'
    },

    model : {
      type: 'string'
    },

  },

  exits: {

  },

  fn: async function (inputs) {
    if (this.req.headers.authorization) {
      let token = this.req.headers.authorization;
      let TokenArray = token.split(' ');
      return jwt.verify(TokenArray[1], sails.config.custom.secret, async (err, decoded) => {
        if (err) {

        } else {
          await Favorites.create({
            createdAt : await sails.helpers.dateParse(),
            updatedAt : await sails.helpers.dateParse(),
            userId : decoded.id,
            model : inputs.model,
            modelId : inputs.id,
          });
        }
      });

    }

  }

};
