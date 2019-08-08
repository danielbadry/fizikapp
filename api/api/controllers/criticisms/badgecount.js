module.exports = {


  friendlyName: 'Badgecount',


  description: 'Badgecount criticisms.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {
    let finalData = {};
    
    let allCriticisms = await Criticisms.find({
      where : {
        response:'',
        isDeleted: false
      }
    });
    
    let allPolice = await Police.find();
    
    let allRequests = await Requests.find({
      where : {
        parentId:'',
        isDeleted: false,
        adminAnswer:''
      }
    });
    
    finalData.data = {
      criticismsBadgeCount : allCriticisms.length,
      requestsBadgeCount : allRequests.length,
      policeBadgeCount : allPolice.length,
    };
    return finalData;
  }


};
