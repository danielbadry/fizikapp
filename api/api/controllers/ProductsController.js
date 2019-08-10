/**
 * ProductsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create: async function(req,res) {
    
    let product = await Products
      .create({
        name:req.param('name'),
        description:req.param('description'),
        price:req.param('price'),
        title:req.param('title'),
        tags:req.param('tags'),
        isEnable:req.param('isEnable'),
        publishDate:req.param('publishDate'),
        createdAt : await sails.helpers.dateParse(),
        updatedAt : await sails.helpers.dateParse()
      })
      .fetch();
      
      await req.file('thumbnail').upload({
        dirname: require('path').resolve(sails.config.appPath, 'assets/files/productImage'),
        saveAs : product.id + '.jpg'
      }, async function (err, uploadedFiles) {
        await Products.updateOne({
          id: product.id
        })
        .set({
          thumbnail: product.id + '.jpg'
        });
        if (err) return res.serverError(err);
      });
      
      await req.file('file').upload({
        maxBytes: 100000000,
        dirname: require('path').resolve(sails.config.appPath, 'assets/files/productFiles'),
        saveAs : product.id + '.avi'
      },async function (err, uploadedFiles) {
        await Products.updateOne({
          id: product.id 
        })
        .set({
          mainFileSrc: product.id + '.avi'
        });
        if (err) return res.serverError(err);
      });

      let allp = await Products
      .find()
      .sort('createdAt DESC')
      .limit(1);
      return res.json(allp[0]);
  }
};