var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
module.exports = {


  friendlyName: 'Create',


  description: 'Create users.',


  inputs: {

    firstName :{
      type: 'string',
      required : false
    },
    
    lastName :{
      type: 'string',
      required : false
    },
    
    gender :{
      type: 'string',
      required : false
    },
    
    userName :{
      type: 'string',
      required : false
    },
    
    fCoin :{
      type: 'number',
      required : false,
      defaultsTo : 0
    },
    
    thumbnail :{
      type: 'string',
      required : false
    },
    
    email :{
      type: 'string',
      required : false
    },

    mobile :{
      type: 'string',
      required : false
    },
    
    phone :{
      type: 'string',
      required : false
    },
    
    password :{
      type: 'string',
      required : false
    },
    
    grade :{
      type: 'string',
      required : false
    },

  },


  exits: {

  },


  fn: async function (inputs) {
    var salt = bcrypt.genSaltSync(10);
        var errorList = [];
        var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        let user = await Users.find({
            or : [
                {
                    mobile:inputs.mobile
                }
            ]
        });
        
        if(user.length > 0) {
            errorList.push({
                errorNumber : 100,
                errorMessage : 'user already exists'
            });
        }

        if (inputs.email && !emailRegEx.test(String(inputs.email).toLowerCase())) {
            errorList.push({
                errorNumber : 101,
                errorMessage : 'email not valid'
            });
        }

        if (errorList.length === 0) {
          // return 'inputs.password';
            var hash = bcrypt.hashSync(inputs.password, salt);
            let user = await Users
                .create({
                    firstName:inputs.firstName,
                    lastName:inputs.lastName,
                    email:inputs.email,
                    userName:inputs.userName,
                    password:hash,
                    mobile:inputs.mobile,
                    phone:inputs.phone,
                    grade:inputs.grade,
                    gender:inputs.gender,
                    fCoin:inputs.fCoin,
                    createdAt : await sails.helpers.dateParse(),
                    updatedAt : await sails.helpers.dateParse(),
                }).fetch();
                var token = jwt.sign({ id: user.id }, sails.config.custom.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                let status = { auth: true, token: token };
                status.errorMessage = null;
                let result = {userinfo:user,status :status};
                return result;
        } else {
            let status = { auth: false, token: null };
                status.errorMessage = errorList;
                let result = {userinfo:null,status :status};
                return result;
        }

  }


};
