/**
 * UsersController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    create: async function(req,res) {
        await Products
          .create({
            firstName:req.param('firstName'),
          })
          .then(function(){
            
            req.file('thumbnail').upload({
                saveAs : 'ali.jpg'
            },function(err, uploadedFiles) {
              if (err)
                return res.serverError(err);
            });

          })
          .then (function() {
            return res.json({
              name:'bye'
            });
          });
      },
};