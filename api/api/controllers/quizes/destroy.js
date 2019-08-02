module.exports = {


  friendlyName: 'Destroy',


  description: 'Destroy quizes.',


  inputs: {
    id : {
      type: 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {

    let result = await Quizes.updateOne({
      id: inputs.id
    })
    .set({
      isDeleted: true
    });

    return result;
  }


};
