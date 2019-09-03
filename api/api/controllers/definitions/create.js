module.exports = {


  friendlyName: 'Create',


  description: 'Create definitions.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    await Definitions.create({
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse(),
      name : inputs.parentId,
      title : inputs.message,
      tags : inputs.tags,
      isDeleted : false,
  });
    return await Requests.find();

  }


};
