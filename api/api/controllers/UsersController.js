/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    create: async function(req,res) {
        let user = await Users
            .create({
                firstName:req.param('firstName'),
            }).fetch();

        await req.file('thumbnail').upload({
                dirname: '../../public/uploads/',
                saveAs : user.id + '.jpg'
            },function(err, uploadedFiles) {
              if (err)
                return res.serverError(err);
            }); 
        
        await Users.updateOne({
                id: user.id
            })
            .set({
                thumbnail: user.id + '.jpg'
            }); 

        return res.ok({
            id: user.id,

        });       
            // .then(function(){
            //     let user = User.find({
            //         isDeleted: false,
                    
            //     });
            //     res.ok({
            //         name : x.firstName
            //     });
                // req.file('thumbnail').upload({
                //     saveAs : 'a.jpg'
                // },function(err, uploadedFiles) {
                //   if (err)
                //     return res.serverError(err);
                // });
            // });
    },
};