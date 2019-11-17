module.exports = {


  friendlyName: 'Create',


  description: 'Create subjects.',


  inputs: {
    name :{
      type : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    return await Subjects.create({
      name: inputs.name,
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse(),
      count: Math.floor(Math.random() * 10) + 1
    }).fetch();
  }


};
