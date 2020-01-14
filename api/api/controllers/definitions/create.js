module.exports = {


  friendlyName: 'Create',


  description: 'Create definitions.',


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

    category :{
      type: 'string',
      required : false
    },
    
    thumbnail :{
      type: 'string',
      required : false
    },

    tags :{
      type: 'json',
      columnType: 'array',
      required : false
    },
  },


  exits: {

  },


  fn: async function (inputs) {
    return inputs;
    return await Definitions
      .create({
        createdAt : await sails.helpers.dateParse(),
        updatedAt : await sails.helpers.dateParse(),
        name : inputs.name,
        title : inputs.title,
        thumbnail : inputs.thumbnail,
        description : inputs.description,
        tags : inputs.tags,
        category:inputs.category,
        isDeleted : false,
      })
      .fetch();
  }


};
