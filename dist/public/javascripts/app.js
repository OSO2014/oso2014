var app=angular.module("osoApp",[]);app.controller("MainCtrl",["$scope",function(a){a.mode="login",a.weightUseRange=!0,a.hopeUseRange=!0,a.weightConfirm=!1,a.inputed=!1,a.goLogin=function(){a.mode="start"},a.goStart=function(){a.mode="start"},a.changeStartInput=function(b){"w"===b&&(a.weightUseRange=!a.weightUseRange),"h"===b&&(a.hopeUseRange=!a.hopeUseRange)},a.goStart=function(){a.mode="myhome"},a.showWeightConfirm=function(){a.weightConfirm=!0},a.postWeight=function(){a.inputed=!0}}]);