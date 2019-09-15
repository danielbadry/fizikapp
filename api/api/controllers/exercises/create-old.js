module.exports = {


  friendlyName: 'Create',


  description: 'Create exercises.',


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
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    return await Exercises.create({
      name: inputs.name,
      title: inputs.title,
      description: inputs.description,
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse(),
      isEnabled : true,
      likes : 0,
      disLikes : 0,
      views : 0,
      tags : inputs.tags
      
    }).fetch();

  }


};
