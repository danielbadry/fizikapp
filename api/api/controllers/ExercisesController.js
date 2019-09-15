/**
 * ExercisesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    create: async function(req,res) {
    
        let exercise = await Exercises
          .create({
            name:req.param('name'),
            description:req.param('description'),
            title:req.param('title'),
            tags:req.param('tags'),
            isEnable:req.param('isEnable'),
            likes:req.param('isEnable'),
            disLikes:req.param('isEnable'),
            views:req.param('isEnable'),
            createdAt : await sails.helpers.dateParse(),
            updatedAt : await sails.helpers.dateParse()
          })
          .fetch();
          
          await req.file('thumbnail').upload({
            dirname: require('path').resolve(sails.config.appPath, 'assets/files/exerciseImage'),
            saveAs : exercise.id + '.jpg'
          }, async function (err, uploadedFiles) {
            await Exercises.updateOne({
              id: exercise.id
            })
            .set({
              thumbnail: exercise.id + '.jpg'
            });
            if (err) return res.serverError(err);
          });
    
          let allp = await Exercises
          .find()
          .sort('createdAt DESC')
          .limit(1);
          return res.json(allp[0]);
      }

};

