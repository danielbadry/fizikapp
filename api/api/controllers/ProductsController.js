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
        category:req.param('category'),
        isEnable: true,
        createdAt : await sails.helpers.dateParse(),
        updatedAt : await sails.helpers.dateParse()
      })
      .then(function(){
        req.file('file').upload(function(err, uploadedFiles) {
          if (err)
            return res.serverError(err);
        });
      })
      .then (async function() {
        let allp = await Products
        .find()
        .sort('createdAt DESC')
        .limit(1);
        return res.json(allp[0]);
      });
  },

};