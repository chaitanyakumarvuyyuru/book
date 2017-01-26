'use strict';

angular.module('myApp.lost', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/lost', {
            templateUrl: 'lost/lost.html',
            controller: 'LostCtrl'
        });
    }])

    .controller('LostCtrl', ['$scope','$rootScope', 'MetaService','$http', function($scope, $rootScope, MetaService,$http) {
        // Configure Meta Tags and Title
        $rootScope.metaservice = MetaService;
        $rootScope.metaservice.set("Lost | angular-seed","desc","");

        $scope.userData = {};

        $scope.lostUser = function(info){
            console.log(info);
            $scope.loading = true;
            //$http.defaults.headers.post["Content-Type"] = "application/json";
            var startTime = new Date().getTime();
            $http.post(SERVERAPI + 'api/forgotpwd', info, {timeout : TIMEOUT}).then(
                function(result) {
                    console.log(result);
                    if (result.data.status) {
                        $scope.loading = false;
                        alert('The link send successsfully to the mail.');
                    } else {
                        $scope.loading = false;
                        alert(result.data.message);
                    }
                },function(error) {
                    $scope.loading = false;
                    var respTime = new Date().getTime() - startTime;
                    if(respTime >= TIMEOUT){
                        alert('Server is busy, please try again.');
                    }else{
                        alert('Something went wrong, Please contact administrator.');
                    }
                });

        }


    }]);