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

    return await Requests.create({
        createdAt : await sails.helpers.dateParse(),
        updatedAt : await sails.helpers.dateParse(),
        parentId : inputs.parentId,
        message : inputs.message,
        isDeleted : false
    }).fetch();

  }


};
