module.exports = {

  friendlyName: 'Fetch first element',

  description: '',

  inputs: {
    name: {
      type: 'json'
    }
  },

  exits: {

    success: {
      description: 'All done.',
    },

  },

  fn: async function (inputs) {
    var first =  function(array, n) {
        if (array == null) 
        return void 0;
      if (n == null) 
        return array[0];
      if (n < 0)
        return [];
      return array.slice(0, n);
    };
    return inputs;
    // return first([{name:'milad'}])
  }

};

