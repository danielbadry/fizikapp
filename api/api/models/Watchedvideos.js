/**
 * Watchedvideos.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

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
    
    userId :{
      type: 'string',
      required : false
    },
    
    model :{
      type: 'string',
      required : false
    },
    
    modelId :{
      type: 'string',
      required : false
    },
    
    startTime :{
      type: 'string',
      required : false
    },

    likes :{
      type: 'number',
      required : false,
      defaultsTo: 0
    },
    
    disLikes :{
      type: 'number',
      required : false,
      defaultsTo: 0
    },
    
    views :{
      type: 'number',
      required : false,
      defaultsTo: 0
    },

    isDeleted :{
      type: 'boolean',
      required : false
    },
    
  },

};

