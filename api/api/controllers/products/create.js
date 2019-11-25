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

    return await Products.create({
        name: inputs.name,
        description:inputs.description,
        title:inputs.title,
        tags:inputs.tags,
        category:inputs.category,
        thumbnail:inputs.thumbnail,
        file:inputs.file,
        isEnabled:true,
        publishDate:inputs.publishDate,
        createdAt : await sails.helpers.dateParse(),
        updatedAt : await sails.helpers.dateParse()
      }).fetch();

  }


};
