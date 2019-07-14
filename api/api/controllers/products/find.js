module.exports = {


  friendlyName: 'Find',


  description: 'Find products.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let allProducts = await Products.find();
    for (let d of allProducts) {
        d.thumbnail = 'https://lh3.googleusercontent.com/-zyP6Q-Ma140/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdArKMW1jV7KBlXHFKywuHtUjuspw.CMID/s96-c/photo.jpg';
    }
    
    return allProducts;

  }


};
