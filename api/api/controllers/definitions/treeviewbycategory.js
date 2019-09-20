module.exports = {


  friendlyName: 'Treeviewbycategory',


  description: 'Treeviewbycategory definitions.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let finalList = [];
    let tempObject = {};
    
    let allCategories = await Categories.find();
    for (let category of allCategories) {
      tempObject = {};
      tempObject.id = category.id;
      tempObject.parentid = category.parentId;
      tempObject.type = 'category';
      tempObject.title = category.name;
      finalList.push(tempObject);
    }
    
    let allDefinitions = await Definitions.find();
    for (let definition of allDefinitions) {
      tempObject = {};
      tempObject.id = definition.id;
      tempObject.parentid = JSON.parse(definition.category).id;
      tempObject.type = 'definition';
      tempObject.title = definition.name;
      finalList.push(tempObject);
    }

    return finalList;
    // return [
    //   {'id':'1' ,'parentid' : '0', 'title' : 'محموله'},
    //   {'id':'4' ,'parentid' : '2', 'title' : 'دسته'},
    //   {'id':'3' ,'parentid' : '1', 'title' : 'یک فیلم'},
    //   {'id':'5' ,'parentid' : '0', 'title' : 'تعریفی'},
    //   {'id':'6' ,'parentid' : '0', 'title' : 'شکوه'},
    //   {'id':'2' ,'parentid' : '1', 'title' : 'دانش'},
    //   {'id':'7' ,'parentid' : '4', 'title' : 'قسمت بندی'},
    //   {'id':'8' ,'parentid' : '1', 'title' : 'سلام'}
    // ];
  }


};
