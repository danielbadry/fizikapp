/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  'GET /users/signupprocess': 'UsersController.signupprocess',
  'PUT /users/updateuserinfo': 'UsersController.updateuserinfo',
  'GET /quizes/getuserquizresponse': 'QuizesController.getuserquizresponse',
  'GET /shops/shopsprocess': 'ShopsController.shopsprocess',
  'GET /categories/allcategories': 'CategoriesController.allcategories',
  'POST /categories/categorize': 'CategoriesController.categorize',
  'GET /subjects/allsubjects': 'SubjectsController.allsubjects',
  'GET /subjects/findparentdirectoryid': 'SubjectsController.findparentdirectoryid',
  'GET /invitation/userinvitationprocess': 'InvitationController.userinvitationprocess',
  'GET /criticisms/badgecount': 'CriticismsController.badgecount',
  'GET /categories/findparentdirectoryid': 'CategoriesController.findparentdirectoryid',
  'GET /sciencechallenge/showmysciencechallenge': 'SciencechallengeController.showmysciencechallenge',
  'POST /categories/paste': 'CategoriesController.paste',
  'POST /categories/deleteitems': 'CategoriesController.deleteitems',
  'PUT /users/sendfcoin': 'UsersController.sendfcoin',
  'POST /shoppingplans/purchase': 'ShoppingplansController.purchase',
  'GET /shoppingplans/shoppingplanspurchasevelocity': 'ShoppingplansController.shoppingplanspurchasevelocity',
  'GET /search/search': 'SearchController.search',
  'POST /users/authenticate': 'UsersController.authenticate',
  'POST /users/updatepassword': 'UsersController.updatepassword',
  'POST /users/sendsms': 'UsersController.sendsms',
  'POST /users/setonlineoffline': 'UsersController.setonlineoffline',
  'POST /users/checkformobilerepetition': 'UsersController.checkformobilerepetition',
  'POST /users/setuseroffline': 'UsersController.setuseroffline',
  'GET /users/listofuserquizes': 'UsersController.listofuserquizes',
  'GET /users/numberofwatchedvideos': 'UsersController.numberofwatchedvideos',
  'GET /users/shoppinglevel': 'UsersController.shoppinglevel',
  'GET /users/findbymobile': 'UsersController.findbymobile',
  'GET /users/financehistory': 'UsersController.financehistory',
  'GET /users/listofonlines': 'UsersController.listofonlines',
  'POST /watchedvideos/setuserwatchstatus': 'Watchedvideos.setuserwatchstatus',
  'GET /requests/getuserrequests': 'RequestsController.getuserrequests',
  'GET /users/userinfo': 'UsersController.userinfo',
  'GET /users/errorlist': 'UsersController.errorlist',
  'GET /products/tamrins': 'ProductsController.tamrins',
  'GET /products/productanalytics': 'ProductsController.productanalytics',
  'GET /definitions/relateddefinitions': 'DefinitionsController.relateddefinitions',
  'GET /definitions/treeviewbycategory': 'DefinitionsController.treeviewbycategory',
};
