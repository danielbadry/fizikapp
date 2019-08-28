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

    tajrobi :{
      type: 'string'
    },
    
    riazi :{
      type: 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    return await Tamrins.create({
      name: inputs.name,
      riazi: inputs.riazi,
      tajrobi: inputs.tajrobi,
      year: inputs.year,
      title: inputs.title,
      description: inputs.description,
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse(),
      
    }).fetch();

  }


};
