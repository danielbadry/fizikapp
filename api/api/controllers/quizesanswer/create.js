var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Create',


  description: 'Create quizesanswer.',


  inputs: {
    answers : {
      type : 'string'
    }
  },


  exits: {

  },


  fn: async function (inputs) {
    let answers = JSON.parse(inputs.answers);
    // return {answers};
    // for (let an of answers) {
    //   an.createdAt = await sails.helpers.dateParse();
    //   an.updatedAt = await sails.helpers.dateParse();
    //   an.isDeleted = false;
    // }
    // return await Quizesanswer.createEach(answers).fetch();

    if (this.req.headers.authorization) {
      let token = this.req.headers.authorization;
      let TokenArray = token.split(' ');

      return jwt.verify(TokenArray[1], sails.config.custom.secret, async (err, decoded) => {
        if (err) {

        } else {
          for (let an of answers) {
              an.createdAt = await sails.helpers.dateParse();
              an.updatedAt = await sails.helpers.dateParse();
              an.isDeleted = false;
              an.userId = decoded.id;
            }
            let data = await Quizesanswer.createEach(answers).fetch();
            let finalData = {};
            finalData.data = {};
            finalData.dataLength = data.length;
            finalData.data = data;
            finalData.errorMessage = null;
            finalData.auth= true;
            return finalData;
        }
      });
    } else {

    }
  }

};
