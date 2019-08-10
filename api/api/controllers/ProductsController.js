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
        
        req.file('thumbnail').upload({
          dirname: require('path').resolve(sails.config.appPath, 'assets/files/productImage')
        },function (err, uploadedFiles) {
          if (err) return res.serverError(err);
        });
        
        req.file('file').upload({
          maxBytes: 100000000,
          dirname: require('path').resolve(sails.config.appPath, 'assets/files/productFiles')
        },function (err, uploadedFiles) {
          if (err) return res.serverError(err);
        });

        
      })
      .then (async function() {
        let allp = await Products
        .find()
        .sort('createdAt DESC')
        .limit(1);
        return res.json(allp[0]);
      });
  }
};