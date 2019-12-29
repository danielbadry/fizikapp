module.exports = {


  friendlyName: 'Create',


  description: 'Create categories.',


  inputs: {

    name :{
      type: 'string',
      required : false
    },
    
    parentId : {
      type: 'string',
      defaultsTo: '0'
    },
    
    priority : {
      type: 'string',
      defaultsTo: '0'
    },

    thumbnail : {
      type: 'string',
      defaultsTo: ''
    },

  },


  exits: {

  },


  fn: async function (inputs) {

    let allCategories = await Categories.find({
      parentId : inputs.parentId
    });
    
    let allProducts = await Products.find({
      category : inputs.parentId
    });

    let sum = allCategories.concat(allProducts);
    
    max = 0;

    for (c of sum) {
      if (parseInt(c.priority) > max) {
        max = parseInt(c.priority);
      }
    }

    return await Categories.create({
      name: inputs.name,
      parentId: inputs.parentId,
      priority: max + 1,
      thumbnail: inputs.thumbnail,
      createdAt : await sails.helpers.dateParse(),
      updatedAt : await sails.helpers.dateParse()
    }).fetch();

  }

};
