var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Setonlineoffline',


  description: 'Setonlineoffline users.',


  inputs: {

  },


  exits: {

  },

  fn: async function (inputs) {

    let token = this.req.headers.authorization;
    let TokenArray = token.split(' ');
    return jwt.verify(TokenArray[1], sails.config.custom.secret, async (err, decoded) => {
      if (err) {

      } else {
        // get current date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        let rec = await Onlineoffline.findOne({
          userId: decoded.id,
          createdAt : today,
        });

        if (typeof(rec) === 'undefined') {
          rec = await Onlineoffline.create({
            userId: decoded.id,
            createdAt : today,
          });
        }

        await Onlineoffline.updateOne({
          id: rec.id,
          userId: decoded.id
        }).set({
          seconds : rec.seconds + 5
        });

        // set isOnline flag on USERS model
        await Users.updateOne({
          id: decoded.id
        }).set({
          isOnline : true
        });
        return ({ auth: true, errorMessage:null, data:[] });
      }
    });

  }

};
