'use strict';

angular
	.module('priceList')
	.component('search', {
		templateUrl: 'app/components/search/search.template.html',
		controller: ['DataService', '$location', function(DataService, $location){
			var text = $location.search().text;
			this.items = DataService.searchByName(text);
			this.items.forEach(e => {
				if (!e.amount) e.amount = 0;
			});
		}]
	});