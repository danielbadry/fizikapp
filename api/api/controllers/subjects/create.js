module.exports = {


  friendlyName: 'Create',


  description: 'Create subjects.',


  inputs: {
    name :{
      type : 'string'
    },
    parentId : {
      type: 'string',
      defaultsTo: '0'
    },
  },


  exits: {

  },


  fn: async function (inputs) {

    let allSubjects = await Subjects.find({
      parentId : inputs.parentId
    });

    max = 0;

    for (c of allSubjects) {
      if (parseInt(c.priority) > max) {
        max = parseInt(c.priority);
      }
    }

    // if(subject.length === 0)
    if(true)
    {
      return await Subjects.create({
        name: inputs.name,
        parentId: inputs.parentId,
        priority: max + 1,
        createdAt : await sails.helpers.dateParse(),
        updatedAt : await sails.helpers.dateParse(),
      }).fetch();
    } else {
      return({
        status : 'repetitive'
      });
    }
  }


};
