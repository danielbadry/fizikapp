var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Create',


  description: 'Create beyondthebook.',


  inputs: {

    name :{
      type: 'string',
      required : false
    },
    
    title :{
      type: 'string',
      required : false
    },
    
    description :{
      type: 'string',
      required : false
    },
    
    tags :{
      type: 'json',
      columnType: 'array',
      required : false
    },
    
    thumbnail :{
      type: 'string',
      required : false
    },
    
    file :{
      type: 'string',
      required : false
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    if(typeof(this.req.headers.authorization) !== 'undefined') {
      token = this.req.headers.authorization;
      let TokenArray = token.split(" ");
      
      if (TokenArray[1] !== 'null')
      {
        let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
        var userId = decodedToken.id;
        let user = await Users.findOne({
          id: userId
        });

        if(user.isAdmin) {
          return await Beyondthebook.create({
              name: inputs.name,
              description:inputs.description,
              title:inputs.title,
              tags:inputs.tags,
              thumbnail:inputs.thumbnail,
              file:inputs.file,
              createdAt : await sails.helpers.dateParse(),
              updatedAt : await sails.helpers.dateParse()
            }).fetch();
          }
      }
    }

  }


};
