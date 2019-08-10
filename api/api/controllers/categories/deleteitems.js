module.exports = {

  friendlyName: 'Deleteitems',

  description: 'Deleteitems categories.',

  inputs: {
    itemsForDelete: {
      type: 'json',
      required: false
    },
  },

  exits: {

  },

  fn: async function (inputs) {

    for (let item of inputs.itemsForDelete) {

      if (item.itemType == 'product') {
        await Products.destroy({id:item.id});
      } 
      else if (item.itemType == 'folder') {
        await Categories.destroy({id:item.id});
      }
    }

  }

};
