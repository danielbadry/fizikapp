module.exports = {


  friendlyName: 'Findone',


  description: 'Findone products.',


  inputs: {

    id :{
      type: 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {
    let tagsArray = [];
    let summary = await Products.findOne({
      id: inputs.id
    });
    
    let productsquestions = await Productsquestions.find({
        where : {isDeleted : false}
    });

    let tags = JSON.parse(summary.tags);
    for (let tag of tags) {
      let tagElement = await Tags.findOne({
        id: tag.id
      });
      tagsArray.push(tagElement);
    }

    return ({
      id: inputs.id,
      summary,
      productsquestions,
      tags: tagsArray
    });

  }

};
