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

    for (let tag of summary.tags) {
      let tagElement = await Tags.findOne({
        id: tag.id
      });
      tagsArray.push(tagElement);
    }

    return ({
      id: inputs.id,
      summary,
      productsquestions,
      tagsArray
    });

  }

};
