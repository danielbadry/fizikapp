var bcrypt = require('bcryptjs');
/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    create: async function(req,res) {
        var salt = bcrypt.genSaltSync(10);
// Hash the password with the salt
var hash = bcrypt.hashSync(req.param('password'), salt);
       

        let user = await Users
            .create({
                firstName:req.param('firstName'),
                lastName:req.param('lastName'),
                email:req.param('email'),
                userName:req.param('username'),
                password:hash,
                mobile:req.param('mobile'),
                phone:req.param('phone'),
                fCoin:req.param('fCoin'),
                gender:req.param('gender'),
                grade:req.param('grade'),
                createdAt : await sails.helpers.dateParse(),
                updatedAt : await sails.helpers.dateParse(),
            }).fetch();

        await req.file('thumbnail').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/files/usersImage'),
                saveAs : user.id + '.jpg'
            },async function(err, uploadedFiles) {
                await Users.updateOne({
                    id: user.id
                })
                .set({
                    thumbnail: user.id + '.jpg'
                });

                if (err) return res.serverError(err);
            }); 

        let allUsers = await Users
        .find()
        .sort('createdAt DESC')
        .limit(1);
        return res.json(allUsers[0]);
    },
};