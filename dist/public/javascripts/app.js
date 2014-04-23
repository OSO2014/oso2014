var app = angular.module('osoApp', [] );

app.controller('MainCtrl', function($scope){
  $scope.mode = 'login';
  $scope.weightUseRange = true;
  $scope.hopeUseRange = true;
  $scope.weightConfirm = false;
  $scope.inputed = false;

  $scope.goLogin = function(){
    $scope.mode = 'start';
  }

  $scope.goStart = function(){
    $scope.mode = 'start';
  }

  $scope.changeStartInput = function(flag){
    if (flag === 'w'){
      $scope.weightUseRange = !$scope.weightUseRange;
    }
    if (flag === 'h'){
      $scope.hopeUseRange = !$scope.hopeUseRange;
    }
  }

  $scope.goStart = function(){
    $scope.mode = 'myhome';
  }

  $scope.showWeightConfirm = function(){
    $scope.weightConfirm = true;
  }

  $scope.postWeight = function(){
    $scope.inputed = true;
  }
});
