module.exports = {


  friendlyName: 'Create',


  description: 'Create beyondthebooks.',


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
  
    isDeleted :{
      type: 'boolean',
      required : false
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

    return await Beyondthebooks.create({
      name: inputs.name,
      description:inputs.description,
      title:inputs.title,
      tags:inputs.tags,
      thumbnail:inputs.thumbnail,
      file:inputs.file,
      duration:inputs.duration,
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse()
    }).fetch();

  }


};
