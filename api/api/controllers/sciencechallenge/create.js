module.exports = {


  friendlyName: 'Create',


  description: 'Create sciencechallenge.',


  inputs: {

    tags : {
      type: 'string'
    },

    name : {
      type: 'string'
    },

    title : {
      type: 'string'
    },
    
    description : {
      type: 'string'
    },
    
    thumbnail : {
      type: 'string'
    },
    
    file : {
      type: 'string'
    },

    duration :{
      type: 'string',
      required : false
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    
      await Sciencechallenge.create({
        createdAt : await sails.helpers.dateParse(),
        description : inputs.description,
        title : inputs.title,
        name : inputs.name,
        tags : inputs.tags || '[]',
        thumbnail : inputs.thumbnail,
        file : inputs.file,
        duration:inputs.duration,
        isDeleted : false,

    });
      return await Sciencechallenge.find();
  }


};
