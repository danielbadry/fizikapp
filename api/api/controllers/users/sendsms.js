var soap = require('soap');
module.exports = {


  friendlyName: 'Sendmail',


  description: 'Sendmail users.',


  inputs: {

    verifyCode : {
      type: 'string'
    },

    mobileNumber : {
      type: 'string'
    }

  },


  exits: {

  },


  fn: async function (inputs) {
    var url = 'http://sms.hostiran.net/webservice/?WSDL';
    var httpOptions = {
      wsdl_headers: {
        'Authorization': 'Basic ' + Buffer.from('miladkhan' + ':' + '789654').toString('base64')
      }
    };


    soap.createClient(url, httpOptions, (err, client) => {
      if (err) {
        response.status(401).end();
        console.info('error');
      } else {
        console.info('okkk');
        var requestArgs = {
          to : '09380331526',
          msg : 'hello'
        };

        client.addHttpHeader('Authorization', 'Basic ' + Buffer.from('miladkhan' + ':' + '789654').toString('base64'));
        client.send(requestArgs, (err, result) => {
          if (err) {
            console.log('error:', err);
            // return res.json(err);
          } else {
            console.log('successfully ', result);
          }
        });
      }
    });

  }

};
