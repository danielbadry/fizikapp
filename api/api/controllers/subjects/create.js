module.exports = {


  friendlyName: 'Create',


  description: 'Create subjects.',


  inputs: {
    name :{
      type : 'string'
    },
    parentId : {
      type: 'string',
      defaultsTo: '0'
    },
  },


  exits: {

  },


  fn: async function (inputs) {

    return await Subjects.create({
      name: inputs.name,
      parentId: inputs.parentId,
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse(),
    }).fetch();
  }


};
