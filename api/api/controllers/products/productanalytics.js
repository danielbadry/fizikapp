module.exports = {


  friendlyName: 'Productanalytics',


  description: 'Productanalytics users.',


  inputs: {

  },

  exits: {

  },

  fn: async function (inputs) {

    let products = await Products.find();
    for (product of products) {

      let views = await Likedislikeview.find({
        modelId: product.id,
        type: 'view'
      });

      let likes = await Likedislikeview.find({
        modelId: product.id,
        type: 'like'
      });

      let dislikes = await Likedislikeview.find({
        modelId: product.id,
        type: 'dislike'
      });

      product.views = views.length;
      product.likes = likes.length;
      product.dislikes = dislikes.length;

    }

    return products;
  }

};
