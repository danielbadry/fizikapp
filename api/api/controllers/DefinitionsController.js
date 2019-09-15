/**
 * DefinitionsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    create: async function(req,res) {
    
        let definition = await Definitions
          .create({
            createdAt : await sails.helpers.dateParse(),
            updatedAt : await sails.helpers.dateParse(),
            name : req.param('name'),
            title : req.param('title'),
            description : req.param('description'),
            tags : req.param('tags'),
            isDeleted : false,
          })
          .fetch();
          
          await req.file('thumbnail').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/files/definitionImage'),
            saveAs : definition.id + '.jpg'
          }, async function (err, uploadedFiles) {
            await Definitions.updateOne({
              id: definition.id
            })
            .set({
              thumbnail: definition.id + '.jpg'
            });
            if (err) return res.serverError(err);
          });
    
          let allp = await Definitions
          .find()
          .sort('createdAt DESC')
          .limit(1);
          return res.json(allp[0]);
      }

};

