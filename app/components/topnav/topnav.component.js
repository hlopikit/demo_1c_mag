'use strict';

angular
	.module('priceList')
	.component('topnav', {
		templateUrl: 'app/components/topnav/topnav.template.html',
		controller: ['$location', function($location){
			this.searchtext = '';
			this.OnClickSearch = () => {
				$location.url('/search?text=' + this.searchtext);
			};
		}]
	});