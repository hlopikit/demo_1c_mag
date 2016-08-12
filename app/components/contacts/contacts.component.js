'use strict';

angular
	.module('priceList')
	.component('contacts', {
		templateUrl: 'app/components/contacts/contacts.template.html',
		controller: ['DataService', function(DataService){
			this.shops = DataService.getShops();
		}]
	});