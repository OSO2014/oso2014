var app = angular.module('osoApp', []);
app.controller('MainCtrl', [
  '$scope',
  function ($scope) {
    $scope.mode = 'login';
    $scope.weightUseRange = true;
    $scope.hopeUseRange = true;
    $scope.weightConfirm = false;
    $scope.inputed = false;
    $scope.selfInput = true;
    $scope.selectedS = 'is-active';
    $scope.selectedU = '';
    $scope.theme = '';
    $scope.goLogin = function () {
      $scope.mode = 'start';
    };
    $scope.goStart = function () {
      $scope.mode = 'start';
      $scope.theme = false;
    };
    $scope.changeStartInput = function (flag) {
      if (flag === 'w') {
        $scope.weightUseRange = !$scope.weightUseRange;
      }
      if (flag === 'h') {
        $scope.hopeUseRange = !$scope.hopeUseRange;
      }
    };
    $scope.goStart = function () {
      $scope.mode = 'myhome';
      $scope.theme = '';
    };
    $scope.showWeightConfirm = function () {
      $scope.weightConfirm = true;
    };
    $scope.postWeight = function () {
      $scope.inputed = true;
    };
    $scope.goSetting = function () {
      $scope.mode = 'setting';
      $scope.theme = 'tm-dark';
    };
    $scope.goListInput = function () {
      $scope.mode = 'listInput';
    };
    $scope.changeInputType = function (flag) {
      console.log(flag, $scope.selfInput);
      if (flag === 'u') {
        $scope.selfInput = false;
        $scope.selectedU = 'is-active';
        $scope.selectedS = '';
      } else {
        $scope.selfInput = true;
        $scope.selectedU = '';
        $scope.selectedS = 'is-active';
      }
    };
    $scope.isActivate = function (flag) {
      console.log('activate', flag);
      $scope.isactive = '';
    };
    $scope.goListInputConfirm = function () {
      $scope.mode = 'listInputConfirm';
    };
  }
]);