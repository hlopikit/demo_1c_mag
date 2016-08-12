'use strict';
//db - database.js
angular
    .module('priceList')
    .factory('CartService', ['DataService', '$window', '$http',
        function (DataService, $window, $http) {
            const NAME = 'it-solution-shop_' + DataService.getPriceID();
            var localdata = $window.localStorage;

            var items = [];
            var total = {value: 0.0};

            // Ищет элемент в массиве items по идентификатору
            var findItemById = function (item) {
                return items.find(e => e.id == item.id);
            };

            var saveLocaldata = function () {
                localdata[NAME] = angular.toJson(items);
            };

            var load = function (data) {
                // элементы из data ищем в нашей database,
                // вносим изменения в найденный элемент из database (в конкр. случае, присваеваем новое количество)
                data.forEach(e => {
                    var tree = DataService.getAbsolutePath(e.id);
                    tree = tree[tree.length - 1]["children"];
                    tree = tree.find(_e => _e.id == e.id);
                    tree.amount = e.amount;

                    items.push(tree);
                });

                saveLocaldata();
                calculateResult();
            };

            var add = function (item) {
                var elem = findItemById(item);

                if (elem === undefined)
                    items.push(item);
                // при добавлении или изменении элемента в коллекции
                // обновляем localdata и считаем итог по сумме
                saveLocaldata();
                calculateResult();
            };

            var remove = function (item) {
                var index = items.indexOf(item);
                if (index != -1) {
                    items.splice(index, 1);
                }
                saveLocaldata();
                calculateResult();
            };

            var clear = function () {
                localdata[NAME] = "";
                $window.location.reload();
            };

            var getItems = function () {
                return items;
            };

            var getTotal = function () {
                return total;
            };

            var change = function (item) {
                var am = parseInt(item.amount, 10);

                if (isNaN(am) || am <= 0) {
                    item.amount = 0;
                    remove(item);
                } else {
                    item.amount = am;
                    add(item);
                }
            };

            /* Считаем итог по всем товарам, конвертим в рубли, возвращаем */
            var calculateResult = function () {

                var strToFloat = function (str) {
                    if (str.length == 0 || !str) {
                        return 0.0;
                    } else {
                        var _str = str.replace(/\s+/g, '');
                        return parseFloat(_str.replace(',', '.'));
                    }
                };

                var __total = 0.0;
                items.forEach(e => {
                    let price = strToFloat(e.price) * e.amount;
                    __total += price;
                });

                total.value = __total;
            };

            /* отправить заказ на email */
            var sendmail = function (contacts, subject, message, callback) {
                let server = "http://cvitrina.it-solution.ru/sendmail/";
                //let server = "http://127.0.0.1:8000/sendmail/";
                //let server = "http://192.168.0.40:8800/sendmail/";
                $http.post(server, {
                    id_shop: DataService.getPriceID(),
                    contacts: contacts,
                    subject: subject,
                    message: message,
                    items: items
                }).then(function (response) {
                    callback(response.data)
                }, function () {
                    callback({success: false});
                });
            };

            if (localdata[NAME] !== undefined && localdata[NAME] !== "") {
                // если в локал дате что-то есть, то пихаем это в массив
                var data = angular.fromJson(localdata[NAME]);
                load(data);
            }

            return {
                change,
                load,
                getItems,
                clear,
                getTotal,
                sendmail
            };
        }]);