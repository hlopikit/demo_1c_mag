'use strict';
/* 
* Директива отслеживает выбор/изменение файла пользователем и передает
* данные (текст) из файла функции указанной в атрибуте file-reader.
*/
angular
	.module('priceList')
	.directive('fileReader', function () {
		return {
			restrict: 'A',
			link: function(scope, element, attrs){
				var callback = scope.$eval(attrs.fileReader);
				element.bind('change', function(evt) {
					var file = evt.target.files[0];
					var reader = new FileReader();
					reader.onload = function(evt){
						var result = evt.target.result;
						callback(result);
						scope.$apply();
					};
					reader.readAsText(file);
				});
			}
		};
	});