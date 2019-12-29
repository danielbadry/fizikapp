var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Getuserrequests',


  description: 'Getuserrequests requests.',


  inputs: {

    userId: {
      type: 'string'
    },
    
  },


  exits: {

  },


  fn: async function (inputs) {

    if (this.req.headers.authorization) {
      let token = this.req.headers.authorization;
      let TokenArray = token.split(' ');
      return jwt.verify(TokenArray[1], sails.config.custom.secret, async (err, decoded) => {
        if (err) {
          return ({ auth: false, errorMessage:null, data: null });
        } else {
          let myRequests = await Requests.find({
            userId : decoded.id
          });
          let requestsIds = [];
          for (f of myRequests) {
            requestsIds.push(f.id);
          }
          let allRequests = await Requests.find({
            id: { in: requestsIds }
          });
          return ({ auth: true, errorMessage:null, data: allRequests });
        }
      });

    } else {
      return ({ auth: false, errorMessage:null, data: null });
    }

  }

};
