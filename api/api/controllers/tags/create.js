module.exports = {


  friendlyName: 'Create',


  description: 'Create tags.',


  inputs: {
    name :{
      type : 'string'
    }
  },


  exits: {

  },
  
  fn: async function (inputs) {

    await Tags.create({
      name: inputs.name,
      createdAt : await sails.helpers.dateParse()
    });

    let list = Tags.find({
      isDeleted : false
    })
    .limit(1)
    .sort ('createdAt DESC');
    return list;
    // return sails.helpers.fetchFirstElement(JSON.stringify(list));
  }


};
