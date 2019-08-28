/**
 * Tamrins.js
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
    
    name :{
      type: 'string',
      required : false
    },
    
    title :{
      type: 'string',
      required : false
    },
    
    description :{
      type: 'string',
      required : false
    },
    
    tags :{
      type: 'json',
      columnType: 'array',
      required : false
    },

    isEnabled :{
      type: 'boolean',
      required : false,
      defaultsTo: true
    },
    
    isDeleted :{
      type: 'boolean',
      required : false
    },
    
    thumbnail :{
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
    
    year :{
      type: 'string',
      required : false
    },
    
    tajrobi :{
      type: 'string'
    },
    
    riazi :{
      type: 'string'
    },
    
  },

};

