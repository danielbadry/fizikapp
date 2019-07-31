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

    let summary = await Products.findOne({
      id: inputs.id
    });
    
    let productsquestions = await Productsquestions.find({
        where : {isDeleted : false}
    });
    
    let quizes = await Quizes.find();

    return ({
      id: inputs.id,
      summary,
      productsquestions,
      quizes
    });

  }

};