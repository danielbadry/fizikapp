module.exports = {


  friendlyName: 'Paste',


  description: 'Paste categories.',


  inputs: {

    currentDirectory: {
      type: 'json',
      required: false
    },

    itemsForCopy: {
      type: 'json',
      required: false
    },

  },


  exits: {

  },


  fn: async function (inputs) {

    for (let item of inputs.itemsForCopy) {
      if (item.itemType == 'product') {
        await Products.updateOne({
          id: item.id
        })
        .set({
          category: JSON.stringify({
            label:inputs.currentDirectory.name,
            value:inputs.currentDirectory.id,
            id:inputs.currentDirectory.id
          })
        });
      } else if (item.itemType == 'folder') {
          await Categories.updateOne({
            id: item.id
          })
          .set({
            parentId: inputs.currentDirectory.id
          });
      }
    }

    return({
      res: 'OK'
    });

  }

};
