/**
 * SciencechallengeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    create: async function(req,res) {
    
        let sciencechallenge = await Sciencechallenge
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
          })
          .fetch();
          
          await req.file('thumbnail').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/files/sciencechallengeImage'),
            saveAs : sciencechallenge.id + '.jpg'
          }, async function (err, uploadedFiles) {
            await Sciencechallenge.updateOne({
              id: sciencechallenge.id
            })
            .set({
              thumbnail: sciencechallenge.id + '.jpg'
            });
            if (err) return res.serverError(err);
          });
          
          await req.file('file').upload({
            maxBytes: 1000000000,
            dirname: require('path').resolve(sails.config.appPath, 'assets/files/sciencechallengeFiles'),
            saveAs : sciencechallenge.id + '.mp4'
          },async function (err, uploadedFiles) {
            await Sciencechallenge.updateOne({
              id: sciencechallenge.id 
            })
            .set({
              mainFileSrc: sciencechallenge.id + '.mp4'
            });
            if (err) return res.serverError(err);
          });
    
          let allp = await Sciencechallenge
          .find()
          .sort('createdAt DESC')
          .limit(1);
          return res.json(allp[0]);
      }

};

