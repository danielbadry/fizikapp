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

    await Tags.create({
      name: inputs.name,
      createdAt : await sails.helpers.dateParse()
    });

    return Tags.find(where)
      .sort('createdAt DESC')
  }


};
