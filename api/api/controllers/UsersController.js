/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    create: async function(req,res) {
        await Users
            .create({
                firstName:req.param('firstName'),
            })
            .then(function(){
                let user = User.find({
                    isDeleted: false,
                    
                });
                res.ok({
                    name : x.firstName
                });
                // req.file('thumbnail').upload({
                //     saveAs : 'a.jpg'
                // },function(err, uploadedFiles) {
                //   if (err)
                //     return res.serverError(err);
                // });
            });
    },
};