'use strict';

angular
   .module('priceList')
   .component('categoryList', {
      templateUrl: 'app/components/category/category.template.html',
      controller: ['$routeParams', 'DataService', function ($routeParams, DataService) {
         this.tree = DataService.isTree();
         this.categories = DataService.getMainCategories();
         
      }]
   });