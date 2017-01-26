'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope','$rootScope', 'MetaService','$http', function($scope, $rootScope, MetaService,$http) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Login | angular-seed","desc","blah blah");

    $scope.userData = {};

    $scope.loginUser = function(info){
        console.log(info);
        $scope.loading = true;
        //$http.defaults.headers.post["Content-Type"] = "application/json";
        var startTime = new Date().getTime();
        $http.post(SERVERAPI + 'api/login', info, {timeout : TIMEOUT}).then(
            function(result) {
                console.log(result);
                if (result.data.status) {
                    $scope.loading = false;
                    alert('You are loged in successfully.');
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