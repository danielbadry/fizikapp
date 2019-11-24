/**
 * ProductsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

  create: async function(req,res) {
    // return res.json({res:'okk'});
    upload.single('file'), function (req, res, next) {
      // req.file is the `avatar` file
      // req.body will hold the text fields, if there were any
    }
    // let product = await Products
    //   .create({
    //     name:req.param('name'),
    //     description:req.param('description'),
    //     title:req.param('title'),
    //     tags:req.param('tags'),
    //     category:req.param('category'),
    //     isEnabled:true,
    //     publishDate:req.param('publishDate'),
    //     createdAt : await sails.helpers.dateParse(),
    //     updatedAt : await sails.helpers.dateParse()
    //   })
    //   .fetch();
      
      // await req.file('thumbnail').upload({
      //   dirname: require('path').resolve(sails.config.appPath, 'assets/files/productImage'),
      //   saveAs : product.id + '.jpg'
      // }, async function (err, uploadedFiles) {
      //   await Products.update({
      //     id: product.id
      //   })
      //   .set({
      //     thumbnail: product.id + '.jpg'
      //   });
      //   if (err) return res.serverError(err);
      // });
      
      // await req.file('file').upload({
      //   maxBytes: 99999999999999999,
      //   dirname: require('path').resolve(sails.config.appPath, 'assets/files/productFiles'),
      //   saveAs : product.id + '.mp4'
      // },async function (err, uploadedFiles) {
        // await Products.update({
        //   id: product.id 
        // })
        // .set({
        //   filesrc: product.id + '.mp4'
        // });

      //   if (err) return res.serverError(err);
      // });

      // let allp = await Products
      // .find()
      // .sort('createdAt DESC')
      // .limit(1);
      // await Products.update({
      //   id: product.id 
      // })
      // .set({
      //   filesrc: product.id + '.mp4'
      // });
      // return res.json({res:'ok'});
  }
};