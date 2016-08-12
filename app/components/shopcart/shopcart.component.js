'use strict';

angular
    .module('priceList')
    .component('shopcart', {
        templateUrl: 'app/components/shopcart/shopcart.template.html',
        controller: ['$location', 'CartService', '$uibModal', 'DataService',
            function ($location, CartService, $uibModal, DataService) {
                this.items = CartService.getItems();
                this.result = CartService.getTotal();

                this.onSaveOrderClick = () => {
                    var json = angular.toJson(this.items)
                    var blob = new Blob([json], {type: "application/json;charset=utf-8"});

                    var now = new Date();
                    var name = "order_" + dateFormat(now, "dd.mm.yyyy_HH.MM.ss") + ".txt";

                    saveAs(blob, name, false);
                };

                this.onLoadOrderClick = function (text) {
                    var __items = angular.fromJson(text);
                    CartService.load(angular.isArray(__items) ? __items : __items.items);
                };

                this.onClearOrderClick = function () {
                    CartService.clear();
                };

                this.onSendMailClick = function () {
                    $uibModal.open({
                        animation: false,
                        templateUrl: 'app/components/shopcart/sendmail_modalwindow.template.html',
                        controller: ['$uibModalInstance', '$scope', function ($uibModalInstance) {
                            this.subject = "";
                            this.to = DataService.getEmail();
                            this.message = "";
                            this.contacts = "";
                            
                            this.onSendClick = () => {
                                if (this.contacts == "") {
                                    alert("Необходимо заполнить контактные данные!");
                                    return;
                                }
                                
                                CartService.sendmail(this.contacts, this.subject, this.message, function (result) {
                                    $uibModal.open({
                                        animation: false,
                                        templateUrl: 'app/components/shopcart/sendmailresult_modalwindow.template.html',
                                        controller: ['$uibModalInstance', 'resultemail', function ($uibModalInstance, resultemail) {
                                            this.resultemail = resultemail;
                                            this.onOkayClick = () => {$uibModalInstance.close()};
                                        }],
                                        controllerAs: '$ctrl',
                                        resolve: {
                                            "resultemail": result
                                        }
                                    });
                                });
                                
                                $uibModalInstance.close();
                            };
                            
                            this.onCancelClick = () => {$uibModalInstance.dismiss()};
                        }],
                        controllerAs: '$ctrl'
                    });
                };

            }]
    });