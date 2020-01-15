module.exports = {


  friendlyName: 'Update',


  description: 'Update products.',


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

    description: {
      type: 'string'
    },

    thumbnail: {
      type: 'string'
    },
    
    file: {
      type: 'string'
    },

    isMedal: {
      type: 'boolean'
    },

    id: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    return await Products.updateOne({
      id:inputs.id
    })
    .set({
      name:inputs.data.summary.name,
      title:inputs.data.summary.title,
      duration:inputs.data.summary.duration,
      description:inputs.description,
      isMedal:inputs.data.summary.isMedal,
      category:inputs.data.summary.category,
      thumbnail:inputs.thumbnail,
      file:inputs.file,
    });

  }


};
