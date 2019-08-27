module.exports = {


  friendlyName: 'Create',


  description: 'Create requests.',


  inputs: {
    
    parentId : {
      type: 'string'
    },

    message : {
      type: 'string'
    },
    
    title : {
      type: 'string'
    },
    
    userId : {
      type: 'string'
    },
    
    tags : {
      type: 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {
 
      await Requests.create({
        createdAt : await sails.helpers.dateParse(),
        updatedAt : await sails.helpers.dateParse(),
        parentId : inputs.parentId,
        message : inputs.message,
        title : inputs.title,
        userId : inputs.userId,
        tags : inputs.tags,
        isDeleted : false,

    });
      return await Requests.find();
  }


};
