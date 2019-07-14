/**
 * Users.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    firstName :{
      type: 'string',
      required : false
    },
    
    lastName :{
      type: 'string',
      required : false
    },
    
    userName :{
      type: 'string',
      required : false
    },
    
    fCoin :{
      type: 'number',
      required : false,
      defaultsTo : 0
    },
    
    birthDate :{
      type: 'string',
      required : false
    },
    
    thumbnailSrc :{
      type: 'string',
      required : false
    },
    
    email :{
      type: 'string',
      required : false
    },

    mobile :{
      type: 'string',
      required : false
    },
    
    phone :{
      type: 'string',
      required : false
    },
    
    grade :{
      type: 'string',
      required : false
    },
    
    address :{
      type: 'json',
      required : false,
    },
    
    suspend :{
      type: 'boolean',
      required : false,
      defaultsTo : false
    },
    
    commentAuthorization :{
      type: 'boolean',
      required : false,
      defaultsTo : true
    },
    
    reportAuthorization :{
      type: 'boolean',
      required : false,
      defaultsTo : true
    },
    
    requestAuthorization :{
      type: 'boolean',
      required : false,
      defaultsTo : true
    },
    
    QAAuthorization :{
      type: 'boolean',
      required : false,
      defaultsTo : true
    },

  },

};

