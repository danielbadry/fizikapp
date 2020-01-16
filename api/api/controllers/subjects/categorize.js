var moment = require('moment');
var momentJalaali = require('moment-jalaali');
module.exports = {


  friendlyName: 'Categorize',


  description: 'Categorize subjects.',


  inputs: {

    id: {
      type: 'string',
      required: false
    },

    itemType: {
      type: 'string',
      required: false
    },

    mode: {
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
    var targetCategoryId;

    if (inputs.itemType === 'product') {
      targetCategoryId = inputs.category;
    } else if(inputs.itemType === 'folder') {
      targetCategoryId = inputs.parentId;
    }

    let childrenCat = await Subjects.find({
      parentId : targetCategoryId
    });

    let childrenPro = await Products.find({
      category : targetCategoryId
    });

    let children = childrenCat.concat(childrenPro);
    children.sort((a, b) => (parseInt(a.priority) > parseInt(b.priority)) ? 1 : -1);

    var container;

    if (inputs.mode === 'down') {
      for (i = 0; i< children.length; i++) {
        if (children[i].id === inputs.id) {
          container = children[i].priority;
          priority = children[i + 1].priority;
          children[i].priority = children[i + 1].priority;
          children[i + 1].priority = container;
        }
      }
    } else if (inputs.mode === 'up') {
      for (i = 0; i< children.length; i++) {
        if (children[i].id === inputs.id) {
          container = children[i].priority;
          priority = children[i - 1].priority;
          children[i].priority = children[i - 1].priority;
          children[i - 1].priority = container;
        }
      }
    }

    for(ch of children) {
      if (ch.category) {
        await Products.updateOne({
          id: ch.id
        })
        .set({
          priority: ch.priority
        });
      } else {
        await Subjects.updateOne({
          id: ch.id
        })
        .set({
          priority: ch.priority
        });
      }
    }

    for (let ch of children) {
      moment.locale('en');
      ch.jalaaliCreatedDate = momentJalaali(ch.createdAt, 'YYYY-M-D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss');
      moment.locale('fa');
      ch.jalaaliUserFriendlyCreatedDate = moment(ch.createdAt).fromNow();
      ch.fullJalaali = ch.jalaaliCreatedDate + ' ' + ch.jalaaliUserFriendlyCreatedDate;
      ch.itemType = (ch.category?'product':'folder');
    }

    children.sort((a, b) => (parseInt(a.priority) > parseInt(b.priority)) ? 1 : -1);
    let finalData = {};
    finalData.data = children;
    finalData.length = children.length;
    return finalData;

  }

};
