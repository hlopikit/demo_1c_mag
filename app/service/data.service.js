'use strict';
//db - database.js
angular
    .module('priceList')
    .factory('DataService', ['$routeParams', function ($routeParams) {
        console.log('load data service');

        /* ID прайса */
        var getPriceID = () => database["price_id"];

        /* Отображать категории деревом или списком (true or false) */
        var isTree = () => database["tree"];

        /* Email для отправки заказа */
        var getEmail = () => database["email_to"];

        /* Основные категории */
        var getMainCategories = () => database["data"].filter(e => e.group);

        // Возвращает объекты, соответствующие указанным идентификаторам, но только группы!
        // Например, передаем [1, 2, 3]; Функция вернет объект 1, его потомок 2 и потомок 2 объекта - 3
        var searchObjects = function (ids) {
            var result = [];

            var current = database["data"];
            for (let j = 0; j < ids.length; j++) {
                current = current.find(e => e.id == ids[j]);

                if (current !== undefined) {
                    if (!current.group) break;

                    result.push(current);
                    current = current["children"];
                } else break;
            }

            return result;
        };

        // Поиск элемента по идентификатору по всей базе
        var searchByID = function (id) {
            let result = -1;
            var filter = (arr, id) => {
                arr.some(e => {
                    if (e.id == id) {
                        result = e;
                        return true;
                    }
                    if (e.group) return filter(e.children, id);
                    return false;
                });

                return result != -1;
            };

            filter(database["data"], id);
            return result;
        };

        //Поиск по заданному наименованию
        var searchByName = function (name) {
            var result = [];
            var filter = (name, arr) => {
                arr.forEach(e => {
                    if (e.group) {
                        filter(name, e.children);
                        return;
                    }

                    if (e.fullname.toLowerCase().indexOf(name.toLowerCase()) !== -1) result.push(e);
                });
            };

            filter(name, database["data"]);
            return result;
        };

        var getCurrentObject = function () {
            return searchByID($routeParams.id);
        };

        // Возвращает полный путь до элемента (ИД), только группы,
        // если в качестве аргумента передана группа, она будет включена в результат
        var getAbsolutePath_old = function (id, elements = false) {
            let path = [];
            let search = function (id, arr) {
                let last = 0;
                arr.some(e => {
                    if (!e.group) return false;
                    if (e.id == id) {
                        if (!elements) path.push(e.id);
                        else path.push(e);

                        return true;
                    }

                    if (last < id && e.id > id) {
                        if (!elements) path.push(e.id);
                        else path.push(e);
                        search(id, e.children);
                    }
                    last = e.id;
                });

                /*arr.forEach((e, i, a) => {
                 if (!e.group) return;

                 if (last < id && e.id > id) {
                 if (!elements) path.push(e.id);
                 else path.push(e);
                 search(id, e.children);
                 }
                 last = e.id;
                 });*/
            };

            search(id, database["data"]);
            return path;
        };

        let getAbsolutePath = function (id) {
            let result = [];
            let searchElement = (id, arr) => {
                for (let e of arr) {
                    if (!e.group && e.id !== id) continue;

                    if (e.id == id) {
                        if (e.group) result.push(e);
                        return true;
                    }

                    if (!e.children.length) continue;

                    result.push(e);
                    if (searchElement(id, e.children)) {
                        return true;
                    } else {
                        result.pop();
                    }
                }

                return false;
            };

            searchElement(id, database['data']);
            return result;
        };

        return {
            getMainCategories,
            getCurrentObject,
            getPriceID,
            getEmail,
            searchByName,
            getAbsolutePath,
            searchByID,
            isTree
        };
    }]);