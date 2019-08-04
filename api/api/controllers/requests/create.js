module.exports = {


  friendlyName: 'Create',


  description: 'Create requests.',


  inputs: {
    
    parentId : {
      type: 'string'
    },

    message : {
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
        isDeleted : false
    });
      return await Requests.find();
  }


};
