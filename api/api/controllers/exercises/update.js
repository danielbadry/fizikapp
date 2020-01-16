module.exports = {


  friendlyName: 'Update',


  description: 'Update Exercises.',


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

    id: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    return await Exercises.updateOne({
      id:inputs.id
    })
    .set({
      name:inputs.data.summary.name,
      title:inputs.data.summary.title,
      duration:inputs.data.summary.duration,
      year:inputs.data.summary.year,
      reference:inputs.data.summary.reference,
      field:inputs.data.summary.field,
      description:inputs.description,
      thumbnail:inputs.thumbnail,
      file:inputs.file,
    });

  }


};
