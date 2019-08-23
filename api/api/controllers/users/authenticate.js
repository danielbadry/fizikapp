module.exports = {


  friendlyName: 'Authenticate',


  description: 'Authenticate users.',


  inputs: {
    email: {
      type: 'string'
    },

    password: {
      type: 'string'
    },
  },


  exits: {

  },


  fn: async function (inputs) {

    au = await Users.find(
      {
        and : [
          {
            email:inputs.email
          },
          {
            password:inputs.password
          }
        ]
      }
    );
    return au[0];

  }


};
