module.exports = {


  friendlyName: 'Create',


  description: 'Create tags.',


  inputs: {
    name :{
      type : 'string'
    }
  },


  exits: {

  },
  
  fn: async function (inputs) {

    return await Tags.create({
      name: inputs.name,
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse()
    }).fetch();

  }

};
