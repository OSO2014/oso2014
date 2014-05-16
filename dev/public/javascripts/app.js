var app = angular.module('osoApp', [
    'ngRoute',
    'dangle'
  ], function () {
  }).config([
    '$routeProvider',
    '$locationProvider',
    '$httpProvider',
    function ($routeProvider, $locationProvider, $httpProvider) {
      $locationProvider.html5Mode(true);
    }
  ]);
app.controller('MainCtrl', [
  '$scope',
  '$http',
  function ($scope, $http) {
    $scope.mode = 'start';
    $scope.weightUseRange = true;
    $scope.hopeUseRange = true;
    $scope.weightConfirm = false;
    $scope.inputed = false;
    $scope.selfInput = true;
    $scope.selectedS = 'is-active';
    $scope.selectedU = '';
    $scope.theme = '';
    $scope.todayWeight = 65;
    $scope.hopeWeight = 65, userid = '';
    $scope.goLogin = function () {
      $scope.mode = 'start';
    };
    $scope.goLoginTwitter = function () {
      location.href = '/auth/twitter';
    };
    $scope.goLoginGoogle = function () {
      location.href = '/auth/google';
    };
    $scope.goLoginFacebook = function () {
      location.href = '/auth/facebook';
    };
    $http({
      method: 'GET',
      url: '/user'
    }).success(function (data) {
      console.log(data[0]);
      $scope.userName = data[0].name;
      if (data[0].hope) {
        $scope.hopeWeight = data[0].hope;
      }
      userid = data[0].id;
      if (userid) {
        $http({
          method: 'GET',
          url: '/getweight'
        }).success(function (data) {
          console.log(data);
          if (data[0]) {
            $scope.todayWeight = data[0].weight;
            $scope.mode = 'myhome';
            $http({
              method: 'get',
              url: '/getweightlist'
            }).success(function (data) {
              $scope.weightdata = {
                _type: 'date_histogram',
                entries: data
              };
              console.log(data);
            });
          }
        });
      }
    });
    $scope.changeStartInput = function (flag) {
      if (flag === 'w') {
        $scope.weightUseRange = !$scope.weightUseRange;
      }
      if (flag === 'h') {
        $scope.hopeUseRange = !$scope.hopeUseRange;
      }
    };
    $scope.goStart = function () {
      $http.post('/setUser', {
        userName: $scope.userName,
        todayWeight: $scope.todayWeight,
        hopeWeight: $scope.hopeWeight
      }).success(function () {
        $scope.mode = 'myhome';
        $scope.theme = '';
      });
    };
    $scope.showWeightConfirm = function () {
      $scope.weightConfirm = true;
    };
    $scope.postWeight = function () {
      $http.post('/setweight', { weight: $scope.todayWeight }).success(function (data) {
        console.log(data);
        $scope.result = data.result;
        $scope.inputed = true;
      });
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