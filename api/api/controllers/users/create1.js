module.exports = {


  friendlyName: 'Create',


  description: 'Create users.',


  inputs: {
    
    firstName : {
      type: 'string',
      required : false
    },
    
    lastName : {
      type: 'string',
      required : false
    },
    
    userName : {
      type: 'string',
      required : false
    },
    
    fCoin : {
      type: 'string',
      required : false
    },
    
    birthDate : {
      type: 'string',
      required : false
    },
    
    email : {
      type: 'string',
      required : false
    },
    
    mobile : {
      type: 'string',
      required : false
    },
    
    phone : {
      type: 'string',
      required : false
    },
    
    grade : {
      type: 'string',
      required : false
    },

  },


  exits: {

  },


  fn: async function (inputs) {

    return await Users.create({
      firstName: inputs.firstName,
      lastName: inputs.lastName,
      userName: inputs.userName,
      fCoin: inputs.fCoin,
      birthDate: inputs.birthDate,
      email: inputs.email,
      mobile: inputs.mobile,
      phone: inputs.phone,
      grade: inputs.grade,
      createdAt : await sails.helpers.dateParse(),
      updateddAt : await sails.helpers.dateParse(),
    })
    .then(function(){
      req.file('file').upload(function(err, uploadedFiles) {
        if (err)
          return res.serverError(err);
      });
    })
    .fetch();

  }


};
