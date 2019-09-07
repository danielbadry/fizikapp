module.exports = {


  friendlyName: 'Setuserwatchstatus',


  description: 'Setuserwatchstatus watchedvideos.',


  inputs: {
    
    userId:{
      type: 'string'
    },
    
    productId:{
      type: 'string'
    },
    
    startTime:{
      type: 'string'
    },

  },


  exits: {

  },


  fn: async function (inputs) {

    return await Watchedvideos.create({
      userId: inputs.userId,
      productId: inputs.productId,
      startTime: inputs.startTime,
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse(),

    }).fetch();

  }

};
