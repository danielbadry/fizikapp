var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Create',


  description: 'Create products.',


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

    category :{
      type: 'string',
      required : false
    },

    isMedal :{
      type: 'boolean',
      required : false,
      defaultsTo: false
    },

    thumbnail :{
      type: 'string',
      required : false
    },

    file :{
      type: 'string',
      required : false
    },

    duration :{
      type: 'string',
      required : false
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    if(typeof(this.req.headers.authorization) !== 'undefined') {
      token = this.req.headers.authorization;
      let TokenArray = token.split(' ');

      if (TokenArray[1] !== 'null')
      {
        let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
        var userId = decodedToken.id;
        let user = await Users.findOne({
          id: userId
        });

        if(user.isAdmin) {
          let cat = inputs.category.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
          let allCategories = await Categories.find({
            parentId : cat
          });

          let allProducts = await Products.find({
            category : cat
          });

          let sum = allCategories.concat(allProducts);

          max = 0;

          for (c of sum) {
            if (parseInt(c.priority) > max) {
              max = parseInt(c.priority);
            }
          }

          return await Products.create({
            name: inputs.name,
            description:inputs.description,
            title:inputs.title,
            tags:inputs.tags,
            category:cat,
            thumbnail:inputs.thumbnail,
            file:inputs.file,
            isMedal:inputs.isMedal,
            priority: max + 1,
            duration:inputs.duration,
            createdAt : await sails.helpers.dateParse(),
            updatedAt : await sails.helpers.dateParse()
          }).fetch();
        }
      }
    }
  }
};
