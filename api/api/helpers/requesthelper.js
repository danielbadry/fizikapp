module.exports = {

  friendlyName: 'Requesthelper',

  description: 'Requesthelper something.',

  inputs: {

    request:{
      type: 'json',
      columnType: 'object'
    },
    
    finalRequests:{
      type: 'json',
      columnType: 'array'
    }

  },

  exits: {

    success: {
      description: 'All done.',
    },

  },

  fn: async function (inputs) {
    for (let request of inputs.finalRequests) {
      if (request.id == inputs.request.id)
        return false;  
    }
    return true;
  }

};

