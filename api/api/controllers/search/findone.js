module.exports = {


  friendlyName: 'Findone',


  description: 'Findone search.',


  inputs: {
    searchterm: {
      type: 'string'
    },
  },


  exits: {

  },


  fn: async function (inputs) {

    let allProducts = await Products.find({
      or : [
        {
          name:{contains: inputs.searchterm}
        },
        {
          title:{contains: inputs.searchterm}
        },
        {
          description:{contains: inputs.searchterm}
        }
      ]
    });

    let allRequests = await Requests.find({
      or : [
        {
          title:{contains: inputs.searchterm}
        },
        {
          message:{contains: inputs.searchterm}
        }
      ]
    });
    
    let allUsers = await Users.find({
      or : [
        {
          firstName:{contains: inputs.searchterm}
        },
        {
          lastName:{contains: inputs.searchterm}
        },
        {
          userName:{contains: inputs.searchterm}
        }
      ]
    });

    let data = {};
    data.allRequests = allRequests;
    data.allProducts = allProducts;
    data.allUsers = allUsers;

    return data;

  }


};
