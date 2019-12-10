module.exports = {


  friendlyName: 'Create',


  description: 'Create criticisms.',


  inputs: {

    userId :{
      type: 'string',
      required : false
    },
    
    mobile :{
      type: 'string',
      required : false
    },
    
    fullName :{
      type: 'string',
      required : false
    },
    
    email :{
      type: 'string',
      required : false
    },
    
    message :{
      type: 'string',
      required : false
    },
    
    type :{
      type: 'number',
      required : false
    },
    
  },


  exits: {

  },


  fn: async function (inputs) {

    return await Criticisms.create({
      userId: inputs.userId,
      message: inputs.message,
      type: inputs.type,
      mobile: inputs.mobile,
      fullName: inputs.fullName,
      email: inputs.email,
      createdAt : await sails.helpers.dateParse(),
    }).fetch();

  }


};
