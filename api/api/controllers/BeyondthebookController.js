/**
 * BeyondthebookController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: async function(req,res) {
    
        let beyondthebook = await Beyondthebook
          .create({
            name:req.param('name'),
            description:req.param('description'),
            title:req.param('title'),
            tags:req.param('tags'),
            category:req.param('category'),
            isEnabled:true,
            publishDate:req.param('publishDate'),
            createdAt : await sails.helpers.dateParse(),
            updatedAt : await sails.helpers.dateParse(),
            likes : 0,
            disLikes : 0,
            views : 0
          })
          .fetch();
          
          await req.file('thumbnail').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/files/beyondthebookImage'),
            saveAs : beyondthebook.id + '.jpg'
          }, async function (err, uploadedFiles) {
            await Beyondthebook.updateOne({
              id: beyondthebook.id
            })
            .set({
              thumbnail: beyondthebook.id + '.jpg'
            });
            if (err) return res.serverError(err);
          });
          
          await req.file('file').upload({
            maxBytes: 1000000000,
            dirname: require('path').resolve(sails.config.appPath, 'assets/files/beyondthebookFiles'),
            saveAs : beyondthebook.id + '.mp4'
          },async function (err, uploadedFiles) {
            await Beyondthebook.updateOne({
              id: beyondthebook.id 
            })
            .set({
              mainFileSrc: beyondthebook.id + '.mp4'
            });
            if (err) return res.serverError(err);
          });
    
          let allp = await Beyondthebook
          .find()
          .sort('createdAt DESC')
          .limit(1);
          return res.json(allp[0]);
      }

};

