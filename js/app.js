angular.module('mainApp', [])
    .controller('mainController', ['$scope', '$http', function ($scope, $http) {
        $scope.apps = [];
        $scope.appCounter = 0;
        $scope.defaultApp = {
            sortType: '0', // значение сортировки по умолчанию (поле id)
            sortReverse: false,  // обратная сортривка
            search: '',
            currentPage: 0,
            itemsPerPage: 50 // количество записей в таблице на одной странице
        };

        $scope.loadDatabase = function (app, type) {
            var urlDatabase = '';
            if (type == 'big') {
                urlDatabase = 'json/bigdata.json';
            } else if (type == 'small') {
                urlDatabase = 'json/smalldata.json';
            } else {
                urlDatabase = 'json/owndata.json';
            }

            $http.get(urlDatabase).success(function (data) {
                app.data = data.slice(1);
                app.tableView = 'templates/tableView.html';

            }).error(function (data) {
                console.log('error', data);
            });
        };

        $scope.addDataToSpan = function (item, app) {
            app.selected = item[1] + ' ( price: '+  item[2] + ', quantity: '+ item[3] +' )';
        };

        $scope.firstPage = function (app) {
            return app.currentPage == 0;
        };

        $scope.lastPage = function (app) {
            var lastPageNum = Math.ceil(app.data.length / app.itemsPerPage - 1);
            return app.currentPage == lastPageNum;
        };

        $scope.numberOfPages = function (app) {
            return Math.ceil(app.data.length / app.itemsPerPage);
        };

        $scope.startingItem = function (app) {
            return app.currentPage * app.itemsPerPage;
        };

        $scope.pageBack = function (app) {
            app.currentPage = app.currentPage - 1;
        };

        $scope.pageForward = function (app) {
            app.currentPage = app.currentPage + 1;
        };

        $scope.addApp = function () {
            var appTemplate = angular.copy($scope.defaultApp);
            $scope.appCounter += 1;
            appTemplate.id = 'app-container-' + $scope.appCounter;
            $scope.apps.push(appTemplate);
        };

        $scope.addApp();

    }])
    .filter('startFrom', function () {
        return function (input, start) {
            start = +start;
            return input.slice(start);
        }
    });
