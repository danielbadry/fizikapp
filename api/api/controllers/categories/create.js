module.exports = {


  friendlyName: 'Create',


  description: 'Create categories.',


  inputs: {
    name :{
      type: 'string',
      required : false
    },
    
    parentId : {
      type: 'string',
      defaultsTo: '0'
    },
  },


  exits: {

  },


  fn: async function (inputs) {

    return await Categories.create({
      name: inputs.name,
      parentId: inputs.parentId,
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse()
    }).fetch();

  }


};
