module.exports = {


  friendlyName: 'Categorize',


  description: 'Categorize categories.',


  inputs: {

    id: {
      type: 'string',
      required: false
    },

    itemType: {
      type: 'string',
      required: false
    },

    parentId: {
      type: 'string',
      required: false
    },

    priority: {
      type: 'string',
      required: false
    },

    category: {
      type: 'string',
      required: false
    },

  },


  exits: {

  },


  fn: async function (inputs) {
    var priority;
    let mode = 'down';
    var targetCategoryId;

    if (inputs.itemType === 'product') {
      targetCategoryId = inputs.category;
    } else {
      targetCategoryId = inputs.parentId;
    }

    let childrenCat = await Categories.find({
      parentId : targetCategoryId
    });

    let childrenPro = await Products.find({
      category : targetCategoryId
    });

    let children = childrenCat.concat(childrenPro);
    children.sort((a, b) => (parseInt(a.priority) > parseInt(b.priority)) ? 1 : -1);

    var container;
    var touchedRecord;

    if (mode === 'down') {
      for (i = 0; i< children.length; i++) {
        if (children[i].id === inputs.id) {
          container = children[i].priority;
          priority = children[i + 1].priority;
          touchedRecord = children[i + 1];
          children[i].priority = children[i + 1].priority;
          children[i + 1].priority = container;
        }
      }
    } else if (mode === 'up') {
      for (i = 0; i< children.length; i++) {
        if (children[i].id === inputs.id) {
          container = children[i].priority;
          priority = children[i - 1].priority;
          touchedRecord = children[i - 1];
          children[i].priority = children[i - 1].priority;
          children[i - 1].priority = container;
        }
      }
    }

    if (touchedRecord.parentId) {
      await Products.updateOne({
        id: inputs.id
      })
      .set({
        priority: priority
      });
    } else {

    }

    if (touchedRecord.itemType === 'folder') {
      await Category.updateOne({
        id: inputs.id
      })
      .set({
        priority: priority
      });
    } else {

    }

    children.sort((a, b) => (parseInt(a.priority) > parseInt(b.priority)) ? 1 : -1);
    let finalData = {};
    finalData.data = children;
    finalData.length = children.length;
    return finalData;

  }


};
