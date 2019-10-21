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
    'GET /quizes/getuserquizresponse': 'QuizesController.getuserquizresponse',
    'GET /shops/shopsprocess': 'ShopsController.shopsprocess',
    'GET /categories/allcategories': 'CategoriesController.allcategories',
    'GET /invitation/userinvitationprocess': 'InvitationController.userinvitationprocess',
    'GET /criticisms/badgecount': 'CriticismsController.badgecount',
    'GET /categories/findparentdirectoryid': 'CategoriesController.findparentdirectoryid',
    'POST /categories/paste': 'CategoriesController.paste',
    'POST /categories/deleteitems': 'CategoriesController.deleteitems',
    'PUT /users/sendfcoin': 'UsersController.sendfcoin',
    'GET /watchedvideos/userwatched': 'WatchedvideosController.userwatched',
    'POST /shoppingplans/purchase': 'ShoppingplansController.purchase',
    'GET /search/search': 'SearchController.search',
    'POST /users/authenticate': 'UsersController.authenticate',
    'POST /watchedvideos/setuserwatchstatus': 'Watchedvideos.setuserwatchstatus',
    'GET /requests/getuserrequests': 'RequestsController.getuserrequests',
    'GET /users/userinfo': 'UsersController.userinfo',
    'GET /products/tamrins': 'ProductsController.tamrins',
    'GET /definitions/relateddefinitions': 'DefinitionsController.relateddefinitions',
    'GET /definitions/treeviewbycategory': 'DefinitionsController.treeviewbycategory',
};