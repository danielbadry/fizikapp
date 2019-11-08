var request = require('request');
module.exports = {


  friendlyName: 'Updatepassword',


  description: 'Updatepassword users.',


  inputs: {
    
    mobile:{
      type:'string'
    },
    
    password:{
      type:'string'
    },

  },


  exits: {

  },


  fn: async function (inputs) {
    let form = {
      password : inputs.password
    };

    let user = await Users.find({
      mobile: inputs.mobile
    });

    await request.patch({url:'http://localhost:1337/Users/' + user[0].id, form},
      function(err,httpResponse,body){ 
        return(body);
      });
      
  }

};
