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
    
    inviter :{
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
                })
                .fetch();
      let shop = await Shops.create({
        shoppingPlanId : '5e24e19701dcbf2e351142de',
        userId : user.id
      });

      let message1 = await Messages.create({
        message: 'هم اکنون میتوانید از تخفیف 50 درصدی استفاده کنید',
        userId : user.id,
        isRead : false,
        isDeleted: false,
      });

      let message2 = await Messages.create({
        message: 'مدیر مجموعه ثبت نام شما ارج می نهد',
        userId : user.id,
        isRead : false,
        isDeleted: false,
      });

      let data = inputs.inviter;
      let buff = new Buffer(data, 'base64');
      let text = buff.toString('ascii');
      // return text;
      // let inviter = await Users.findOne({
      //   id : text
      // });

      await Users.updateOne({
        id: text
      })
      .set({
        fCoin : 236
      });

      var token = jwt.sign({ id: user.id }, sails.config.custom.secret, {
        expiresIn: 259200 // expires in 72 hours
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
