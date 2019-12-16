module.exports = {


  friendlyName: 'Update',


  description: 'Update products.',


  inputs: {

    summary: {
      type: 'json'
    },

    id: {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    // return inputs.summary;
    return await Products.updateOne({
      id:inputs.id
    })
    .set({
      name:inputs.summary.name,
      title:inputs.summary.title,
      duration:inputs.summary.duration
    });

  }


};
