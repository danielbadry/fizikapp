var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Setonlineoffline',


  description: 'Setonlineoffline users.',


  inputs: {

    token : {
      type: 'string'
    },

  },


  exits: {

  },

  fn: async function (inputs) {

    let token = this.req.headers.authorization;
    let TokenArray = token.split(' ');
    let decodedToken = jwt.verify(TokenArray[1], sails.config.custom.secret);
    let userId = decodedToken.id;

    // get current date
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    let rec = await Onlineoffline.findOne({
      userId: userId,
      createdAt : today,
    });

    if (typeof(rec) === 'undefined') {
      rec = await Onlineoffline.create({
        userId: userId,
        createdAt : today,
      });
    }

    await Onlineoffline.updateOne({
      id: rec.id,
      userId: userId
    }).set({
      seconds : rec.seconds + 1
    });

    // set isOnline flag on USERS model
    await Users.updateOne({
      id: userId
    }).set({
      isOnline : true
    });
  }

};
