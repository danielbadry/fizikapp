module.exports = {


  friendlyName: 'Userwatched',


  description: 'Userwatched watchedvideos.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    // return 'hello';
    // return await Watchedvideos.find();
    let userwatched = await Watchedvideos.find();
    for (let uw of userwatched) {
      
      // find user
      let user = await Users.find({
        where : {
          id : uw.userId
        }
      });
      
      // find product
      let product = await Products.find({
        where: {
          id: uw.productId
        }
      });

      uw.userInfo = user[0];
      uw.productInfo = product[0];
    }

    return userwatched;
  }


};
