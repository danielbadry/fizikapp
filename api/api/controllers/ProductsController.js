/**
 * ProductsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create: async function(req,res) {
    await Products
      .create({
        name:req.param('name'),
        description:req.param('description'),
        price:req.param('price'),
        title:req.param('title'),
        tags:req.param('tags'),
        isEnable:req.param('isEnable'),
        publishDate:req.param('publishDate'),
      })
      .then(function(){
        req.file('file').upload(function(err, uploadedFiles) {
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