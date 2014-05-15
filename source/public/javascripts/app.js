var app = angular.module('osoApp', ['ngRoute'], function(){} ).config(function ($routeProvider, $locationProvider, $httpProvider){
    $locationProvider.html5Mode(true);
  });

app.controller('MainCtrl', function($scope,$http){
  $scope.mode = 'start';
  $scope.weightUseRange = true;
  $scope.hopeUseRange = true;
  $scope.weightConfirm = false;
  $scope.inputed = false;
  $scope.selfInput = true;
  $scope.selectedS = 'is-active';
  $scope.selectedU = '';
  $scope.theme = '';
  $scope.todayWeight = 65.0;
  $scope.hopeWeight = 65.0;

  $scope.goLogin = function(){
    $scope.mode = 'start';
  }

  $scope.goLoginTwitter = function(){
    location.href = '/auth/twitter';
  }

  $http({method: 'GET',url: '/user'})
    .success(function(data){
      console.log(data[0]);
      $scope.userName = data[0].name;
      $scope.hopeWeight = data[0].hope;
    });

  $scope.changeStartInput = function (flag) {
    if (flag === 'w') {
      $scope.weightUseRange = !$scope.weightUseRange;
    }
    if (flag === 'h') {
      $scope.hopeUseRange = !$scope.hopeUseRange;
    }
  }

  $scope.goStart = function(){
    $http.post('/setUser',{
      userName: $scope.userName,
      todayWeight: $scope.todayWeight,
      hopeWeight: $scope.hopeWeight
    }).success(function(){
      $scope.mode = 'myhome';
      $scope.theme = '';
    });
  }

  $scope.showWeightConfirm = function(){
    $scope.weightConfirm = true;
  }

  $scope.postWeight = function(){
    $scope.inputed = true;
  }

  $scope.goSetting = function(){
    $scope.mode = 'setting';
    $scope.theme = 'tm-dark';
  }

  $scope.goListInput = function(){
    $scope.mode = 'listInput';
  }

  $scope.changeInputType = function (flag) {
    console.log( flag, $scope.selfInput );
    if (flag === 'u') {
      $scope.selfInput = false;
      $scope.selectedU = 'is-active';
      $scope.selectedS = '';
    } else {
      $scope.selfInput = true;
      $scope.selectedU = '';
      $scope.selectedS = 'is-active';
    }
  }

  $scope.isActivate = function (flag) {
    console.log( 'activate', flag );
    $scope.isactive = ''
  }

  $scope.goListInputConfirm = function(){
    $scope.mode = 'listInputConfirm';
  }
});
