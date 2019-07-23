module.exports = {


  friendlyName: 'Update one',


  description: '',


  inputs: {

    id : {
      type: 'string'
    }, 
    
    response : {
      type: 'string'
    } 
  
  },


  exits: {

  },


  fn: async function (inputs) {

    await Criticisms.update({
      id: inputs.id
    })
    .set({
      response: inputs.response
    });

    // output the updated record

  }


};
