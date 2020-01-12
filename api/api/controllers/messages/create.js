module.exports = {


  friendlyName: 'Create',


  description: 'Create messages.',


  inputs: {

    message : {
      type: 'string'
    },

    userId : {
      type: 'string'
    },

  },


  exits: {

  },


  fn: async function (inputs) {

    await Messages.create({
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse(),
      userId : inputs.userId,
      message : inputs.message,
      isRead : false,
      isDeleted : false
    });
    return await Requests.find();

  }


};
