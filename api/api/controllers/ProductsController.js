/**
 * ProductsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  // create: async function(req,res){
  //   await Products.create({
  //       name:req.param('name'),
  //       description:req.param('description'),
  //       price:req.param('price'),
  //     })
  //   .exec(function (err, product) {
  //           if (err) return res.json(err, 400);
  //           return res.json({'status':'ok'});
  //    });
  // }
  create: function(req,res){
    req.file('file').upload(function (err, uploadedFiles) {
      if (err) return res.serverError(err);
      return res.json({
        message: uploadedFiles.length + ' file(s) uploaded successfully!'
      });
    });
  }
};

