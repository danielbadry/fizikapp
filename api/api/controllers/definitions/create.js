module.exports = {


  friendlyName: 'Create',


  description: 'Create definitions.',


  inputs: {

    name: {
      type: 'string'
    },
    
    title: {
      type: 'string'
    },
    
    description: {
      type: 'string'
    },
    
    tags: {
      type: 'string'
    },

  },


  exits: {

  },


  fn: async function (inputs) {

    await Definitions.create({
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse(),
      name : inputs.name,
      title : inputs.title,
      description : inputs.description,
      tags : inputs.tags,
      isDeleted : false,
  });
    return await Requests.find();

  }


};
