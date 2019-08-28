module.exports = {


  friendlyName: 'Create',


  description: 'Create tamrins.',


  inputs: {
    
    name :{
      type: 'string'
    },

    title :{
      type: 'string'
    },

    description :{
      type: 'string'
    },

    year :{
      type: 'string'
    },

    field :{
      type: 'string'
    },
    
  },


  exits: {

  },


  fn: async function (inputs) {

    return await Tamrins.create({
      name: inputs.name,
      field: inputs.field,
      year: inputs.year,
      title: inputs.title,
      description: inputs.description,
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse(),
    }).fetch();

  }


};
