module.exports = {


  friendlyName: 'Update',


  description: 'Update definitions.',


  inputs: {

    name: {
      type: 'string'
    },
    
    title: {
      type: 'string'
    },
    
    data: {
      type: 'json'
    },
    
    thumbnail: {
      type: 'string'
    },
    
    file: {
      type: 'string'
    },
    
    description: {
      type: 'string'
    },

    id: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    return await Definitions.updateOne({
      id:inputs.id
    })
    .set({
      name:inputs.data.summary.name,
      title:inputs.data.summary.title,
      duration:inputs.data.summary.duration,
      description:inputs.description,
      thumbnail:inputs.thumbnail,
      file:inputs.file,
      category: inputs.category
    });

  }


};
