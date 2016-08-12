'use strict';

angular
   .module('priceList')
   .config(['$locationProvider', '$routeProvider',
      function ($locationProvider, $routeProvider) {
         $locationProvider.hashPrefix('!');
         //$locationProvider.html5Mode(true);

         $routeProvider
            .when('/', {
               template: '<main-page></main-page>'
            })
            .when('/contacts', {
               template: '<contacts></contacts>'
            }).when('/shopcart', {
            template: '<shopcart></shopcart>'
         })
            .when('/search', {
               template: '<search></search>'
            })
            /*.when('/:ids*\/', {
               template: '<items-list></items-list>'
            })*/
            .when('/:id', {
               template: '<items-list></items-list>'
            })
            .otherwise('/')
      }]);