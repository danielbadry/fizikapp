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
    'GET /shops/shopsprocess': 'ShopsController.shopsprocess',
    'GET /categories/allcategories': 'CategoriesController.allcategories'
};