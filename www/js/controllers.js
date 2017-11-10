angular.module('starter.controllers', [])
  .controller('AppCtrl', function ($scope, $ionicModal, $timeout, $state, $http) {

    $scope.webServiceUrl = "http://localhost/";

    $scope.user = null;
    // Form data for the login modal
    $scope.loginData = {};
    $scope.loginData.username = "";
    $scope.loginData.password = "";

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.login_modal = modal;
    });

    $scope.openModal = function (item) {
      if (item == 'login') {
        $scope.login_modal.show();
      }
    };

    $scope.closeModal = function (item) {
      if (item == 'login') {
        $scope.login_modal.hide();
      }else if (item == 'login2kayit'){
        $timeout(function(){
          $scope.closeModal('login');
          $state.go('app.kayit');
        },200);
      }
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      $http.get($scope.webServiceUrl + "json_login.php?kadi=" + $scope.loginData.username + "&sifre="+$scope.loginData.password)
       .then(function (response) {
         if (typeof response.data.errorMessage !== 'undefined'){
             alert(response.data.errorMessage);
         }else{
            $scope.user = response.data.data;
            $scope.closeModal('login');
         }
      });
    };

    $scope.logout = function(){
       $scope.user = null;
    };
  })

  .controller('KayitCtrl', function ($scope, $stateParams, $http, $state) {
    // Form data for the register modal
    $scope.kayitData = {};
    $scope.kayitData.kadi = "";
    $scope.kayitData.sifre = "";
    $scope.kayitData.sifreT = "";
    $scope.kayitData.email = "";

    $scope.doRegister = function () {
      var postData = [];
      postData.push(encodeURIComponent("kadi") + "=" + encodeURIComponent($scope.kayitData.kadi));
      postData.push(encodeURIComponent("sifre") + "=" + encodeURIComponent($scope.kayitData.sifre));
      postData.push(encodeURIComponent("sifreT") + "=" + encodeURIComponent($scope.kayitData.sifreT));
      postData.push(encodeURIComponent("email") + "=" + encodeURIComponent($scope.kayitData.email));
      var data = postData.join("&");
      $http({
        method: 'POST',
        url: $scope.webServiceUrl + 'json_kullanicikayit.php',
        data: data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function (data) {
         if (data != ""){
            alert(data);
         }else{
           $scope.user = $scope.kayitData;
           window.location.href="#/app/tabs/";
         }
      }).error(function (data) {
         alert(data);
      });
    };
  })

  .controller('ForumKonuCtrl', function ($scope, $stateParams, $http, $state) {

    $scope.konuKayitData = {};

    $scope.konuKayit = function(){

      var kayitData = [];
      kayitData.push(encodeURIComponent("konuBaslik")+"="+encodeURIComponent($scope.konuKayitData.konuBaslik));
      kayitData.push(encodeURIComponent("konuAciklama")+"="+encodeURIComponent($scope.konuKayitData.konuAciklama));
      var data = kayitData.join("&");

      $http({
        method:'POST',
        url:$scope.webServiceUrl + 'json_konukayit.php',
        data:data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      }).success(function(data){
        if (data != ""){
            alert(data);  
         }else{
           $scope.user = $scope.konuKayitData;
           window.location.href="#/app/tabs/";
         }
       }).error(function (data) {
         alert(data);
      });
    };

  })


  .controller('PlaylistsCtrl', function ($scope, $stateParams, $http, $rootScope) {
     $http.get($scope.webServiceUrl + "json_konulist.php")
      .then(function (response) {
        $rootScope.playlists = response.data;
      });
  })

  .controller('PlaylistCtrl', function ($scope, $stateParams, $http, $rootScope) {
      $http.get($scope.webServiceUrl + "json_konulist.php?id=" + $stateParams.playlistId)
        .then(function (response) {
          $rootScope.details = response.data;
        });
  })

  .controller('HomeCtrl', function ($scope, $stateParams, $http, $rootScope) {
    $http.get($scope.webServiceUrl + "json_otellist.php")
      .then(function (response) {
        $rootScope.otel = response.data;
      });
  })
  .controller('OtelCtrl', function ($scope, $http, $rootScope) {
    $http.get($scope.webServiceUrl + "json_otellist.php")
      .then(function (response) {
        $rootScope.otel = response.data;
      });
  })
  .controller('OtelDetayCtrl', function ($scope, $stateParams, $rootScope, $http) {
    $http.get($scope.webServiceUrl + "json_otellist.php?id=" + $stateParams.otelsId)
      .then(function (response) {
        $rootScope.detail = response.data;
      });
  })


  .controller('TabsCtrl', function ($scope) {

  });
