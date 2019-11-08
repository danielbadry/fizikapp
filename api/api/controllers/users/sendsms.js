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
    

    soap.createClient(url, httpOptions, function(err, client) {
      if (err) {
        response.status(401).end();
      } else {
        var requestArgs = {
          to : inputs.mobileNumber,
          msg : 'فیزیک اپ' + '\r\n' + 'کد تایید' + '\r\n' + inputs.verifyCode
        };

        client.addHttpHeader('Authorization', "Basic " + Buffer.from('miladkhan' + ':' + '789654').toString('base64'));
        client.send(requestArgs, function(err, result) {
          if (err) {
            console.log(err.message);
          }
        });
      }
    });

  }

};
