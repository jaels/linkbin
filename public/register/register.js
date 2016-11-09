'use strict';

$stateProvider.state('register',{
    url:'/register',
    controller:'RegisterCtrl',
    templateUrl:'register.html'
});

angular.module('linkbinApp.register', ['ngRoute']);

linkbinApp.register.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/register', {
        templateUrl: 'views/register.html',
        controller: 'RegisterCtrl'
    });
}])

linkbinApp.controller('RegisterCtrl', ['$scope','authService', '$state', function($scope,authService,$state) {
    $scope.buttonText="register";
    $scope.register = function(){
        $scope.buttonText=" Registering in. . . ";
        authService.register($scope.credentials.username, $scope.credentials.password).then(function(data){
            // $state.go('user.postViewAll');
            $state.go('home');
        },function(err){
            $scope.invadRegister=true;
        }).finally(function(){
            $scope.buttonText="Register";
        });
    };
}]);


angular.module('linkbinApp.register.services').factory('authService', ['AUTH_ENDPOINT','LOGOUT_ENDPOINT','$http','$cookieStore', function(AUTH_ENDPOINT,LOGOUT_ENDPOINT,$http,$cookieStore){
    var auth={};
    auth.login=function(username,password){
        return $http.post(AUTH_ENDPOINT,{username:username, password:password}).then(function(response,status){ auth.user=response.data;
            $cookieStore.put('user',auth.user);
            return auth.user;
        });
    }
    auth.logout=function(){
        return $http.post(LOGOUT_ENDPOINT).then(function(response){
            auth.user=undefined;
            $cookieStore.remove('user');
        }); }
        return auth;
    }]);


    angular.module('linkbinApp.register.services').value('AUTH_ENDPOINT', 'http://localhost:8080/register');
    angular.module('linkbinApp.register.services').value('LOGOUT_ENDPOINT', 'http://localhost:8080/logout');

    var app = angular.module("app", ['ngRoute']);


    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/register', {
            templateUrl: 'register/register.html',
            controller: 'exempleCtrl'
        });
    }])

    app.controller("exempleCtrl", function($scope) {
        $scope.name = "World"
    });

    // GET method for user
    // this.user = function(){
    //     var that = this;
    //
    //     var params = {
    //         username: that.usernameFilter,
    //         password: that.passwordFilter
    //     };
    // $http
    // .get("http://localhost:8080/api/user", {params:params})
    // .then(function (result){
    //     that.user = result.data;
    // }).catch(function(result){
    //     that.message = "Error:" + result.status + " " + results.statusText;
    // });
    // }

    // POST method for user
    //
    // this.user = function (){
    //
    //     var that = this;
    //
    //     var params = {
    //         username = that.username.input,
    //         password = that.password.input
    //     };
    //
    //     $http.post("http://localhost:8080/api/user", params, {}).then(function(results){
    //         that.message = " New User";
    //     }).catch(function(result){
    //         that.message = "Error creating User" + result.status;
    //     });
    //
    // };
//