'use strict';

angular
   .module('priceList')
   .component('breadCrumbs', {
      templateUrl: 'app/components/breadcrumbs/breadcrumbs.template.html',
      controller: ['DataService', function (DataService) {
         let element = DataService.getCurrentObject();
         this.road = DataService.getAbsolutePath(element.id);
         /*var strRoad = [{"fullname": road[0].fullname, "id": road[0].id}];
         for (var i = 1; i < road.length; i++) {
            var str = {
               "fullname": road[i].fullname,
               "id": strRoad[strRoad.length - 1].id + '/' + road[i].id
            };
            strRoad.push(str);
         }
         this.strRoad = strRoad;*/
      }]
   });