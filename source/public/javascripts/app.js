var app = angular.module('osoApp', ['ngRoute'] ).config(function ($routeProvider, $locationProvider, $httpProvider){
    $locationProvider.html5Mode(true);

    // $httpProvider.responseInterceptors.push(['$q', '$location',function($q, $location) {
    //   return function(promise) {
    //     return promise.then(function(response) {
    //         // Success: 成功時はそのまま返す
    //         console.log('Success');
    //         return response;
    //       }, function(response) {
    //         // Error: エラー時は401エラーならば/loginに遷移
    //         console.log('Error');
    //         if (response.status === 401) {
    //           // $location.url('/login');
    //         }
    //         // return $q.reject(response);
    //       }
    //     );
    //   };
    // }]);

  });

app.controller('MainCtrl', function($scope){
  $scope.mode = 'start';
  $scope.weightUseRange = true;
  $scope.hopeUseRange = true;
  $scope.weightConfirm = false;
  $scope.inputed = false;
  $scope.selfInput = true;
  $scope.selectedS = 'is-active';
  $scope.selectedU = '';
  $scope.theme = '';

  $scope.goLogin = function(){
    $scope.mode = 'start';
  }

  $scope.goStart = function(){
    $scope.mode = 'start';
    $scope.theme = false;
  }

  $scope.changeStartInput = function (flag) {
    if (flag === 'w') {
      $scope.weightUseRange = !$scope.weightUseRange;
    }
    if (flag === 'h') {
      $scope.hopeUseRange = !$scope.hopeUseRange;
    }
  }

  $scope.goStart = function(){
    $scope.mode = 'myhome';
    $scope.theme = '';
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
