'use strict';

angular
   .module('priceList')
   .component('newlist', {
      templateUrl: 'app/components/newlist/newlist.template.html',
      controller: ['$scope', 'DataService', '$location', 'CartService', function ($scope, DataService, $location, CartService) {
         this.parentCtrl = $scope.$parent.$ctrl;

         this.amountChange = function (item) {
            CartService.change(item);
         };

         this.openGroup = function (item) {
            let elem = DataService.getAbsolutePath(item.id);
            $location.url(elem[elem.length - 1].id);
         };

         this.inputClick = function ($event) {
            $event.stopPropagation();
         };
      }]
   });