module.exports = {


  friendlyName: 'Listofuserquizes',


  description: 'Listofuserquizes users.',


  inputs: {

    userId :{
      type: 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {
    
    let finalData = {};
    let quizesanswersIDs = [];
    let quizesanswers = await Quizesanswer.find({
      userId : inputs.userId
    });
    
    for (qa of quizesanswers) {
      quizesanswersIDs.push(qa.quizId);
    }
    
    let quizes = await Quizes.find({
      id: { in: quizesanswersIDs }
    });

    // return quizes;
    let info = [];
    let products = await Products.find();
    // return products;
    for (let i = 0; i < products.length; i++ ) {
      for (let j = 0; j < quizes.length; j++) {
        if (quizes[j].modelId === products[i].id) {
          if(!info.includes(products[i].name))
            info.push(products[i].name);
        }
      }
    }

    finalData.dataLength = info.length;
    finalData.data = info;
    return finalData;

  }


};
