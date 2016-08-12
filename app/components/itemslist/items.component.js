'use strict';

angular
   .module('priceList')
   .component('itemsList', {
      templateUrl: 'app/components/itemslist/items.template.html',
      controller: ['$location', 'DataService', function ($location, DataService) {
         console.log('load items component');

         /*this.openGroup = function(id){
          $location.path($location.path() + id);
          };*/

         /*this.amountChange = function(item){
          item.groupUrl = $location.path();
          CartService.change(item);
          };*/

         let element = DataService.getCurrentObject();
         let obj = element.children;

         this.groups = obj.filter(e => e.group);

         this.items = obj.filter(e => {
            if (!e.group) {
               var am = parseInt(e.amount);
               if (isNaN(am) || am < 0) e.amount = 0;
               return true;
            } else return false;
         });

         //var obj = DataService.getCurrentObjects();
         //obj = obj[obj.length - 1]["children"];

         /*this.groups = obj.filter(function (element, index, array) {
            return element.group;
         });

         this.items = obj.filter(function (element, index, array) {
            if (!element.group) {
               var am = parseInt(element.amount);
               if (isNaN(am) || am < 0) element.amount = 0;
               return true;
            } else return false;
         });*/
      }]
   });