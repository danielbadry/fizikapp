module.exports = {

  friendlyName: 'Dateparse',

  description: 'Dateparse something.',

  inputs: {
    
  },

  exits: {

    success: {
      description: 'All done.',
    },

  },

  fn: async function (inputs) {
    var d = new Date();
    function z(n){return (n<10?'0':'') + n}
    return d.getFullYear() + '-' + z(d.getMonth()+1) + '-' +
      z(d.getDate()) + 'T' + z(d.getHours()) + ':' +
      z(d.getMinutes()) + ':' + z(d.getSeconds())
  }

};

