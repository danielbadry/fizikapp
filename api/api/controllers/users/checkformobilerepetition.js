module.exports = {


  friendlyName: 'Checkformobilerepetition',


  description: 'Checkformobilerepetition users.',


  inputs: {

    mobileNumber:{
      type:'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {

    let user = await Users.find({
      mobile: inputs.mobileNumber
    });
    if (user.length) 
      return({
        numberExists: true
      });
    else 
      return({
        numberExists: false
      });
  }


};
