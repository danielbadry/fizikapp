var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    create: async function(req,res) {
        var salt = bcrypt.genSaltSync(10);
        var errorList = [];
        var emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        let user = await Users.find({
            or : [
                {
                    userName:req.param('userName')
                }
            ]
        });
        // return res.json(user);
        if(user.length > 0) {
            errorList.push({
                errorNumber : 100,
                errorMessage : 'user already exists'
            });
        }

        if (req.param('email') && !emailRegEx.test(String(req.param('email')).toLowerCase())) {
            errorList.push({
                errorNumber : 101,
                errorMessage : 'email not valid'
            });
        }

        if (errorList.length === 0) {
            var hash = bcrypt.hashSync(req.param('passWord'), salt);
            let user = await Users
                .create({
                    firstName:req.param('firstName'),
                    lastName:req.param('lastName'),
                    email:req.param('email'),
                    userName:req.param('userName'),
                    password:hash,
                    mobile:req.param('mobile'),
                    phone:req.param('phone'),
                    grade:req.param('grade'),
                    createdAt : await sails.helpers.dateParse(),
                    updatedAt : await sails.helpers.dateParse(),
                }).fetch();
                var token = jwt.sign({ id: user.id }, sails.config.custom.secret, {
                    expiresIn: 86400 // expires in 24 hours
                });
                let status = { auth: true, token: token };
                status.errorMessage = null;
                let result = {userinfo:user,status :status};
                return res.json(result);
        } else {
            let status = { auth: false, token: null };
                status.errorMessage = errorList;
                let result = {userinfo:null,status :status};
                return res.json(result);
        }
        
        // await req.file('thumbnail').upload({
        //     dirname: require('path').resolve(sails.config.appPath, 'assets/files/usersImage'),
        //         saveAs : user.id + '.jpg'
        //     },async function(err, uploadedFiles) {
        //         await Users.updateOne({
        //             id: user.id
        //         })
        //         .set({
        //             thumbnail: user.id + '.jpg'
        //         });

        //         if (err) return res.serverError(err);
        //     }); 
        
        
    }
};