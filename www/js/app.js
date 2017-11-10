angular.module('starter', ['ionic', 'starter.controllers'])

    .run(function($ionicPlatform, $ionicPopup) {
      $ionicPlatform.ready(function() {

        // Check for network connection
        if(window.Connection) {
          if(navigator.connection.type == Connection.NONE) {
            $ionicPopup.confirm({
              title: 'İnternete Baglanamadı !',
              content: 'Giriş Yapılamadı, Lütfen Mobil Verinizi Açıp Tekrar Deneyiniz.'
            })
            .then(function(result) {
              if(!result) {
                ionic.Platform.exitApp();
              }
            });
          }
        }

      });
    })
  .config(function ($stateProvider, $urlRouterProvider) {
    
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })
      .state('app.tabs', {
        url: "/tabs",
        views: {
          'menuContent': {
            templateUrl: "templates/tabs.html",
            controller: 'TabsCtrl'
          }
        }
      })
      .state('app.tabs.arama', {
        url: "/arama",
        views: {
          'arama-tabs': {
            templateUrl: "templates/arama.html",
            controller: 'HomeCtrl'
          }
        }
      })
      .state('app.tabs.otel', {
        url: "/otel",
        views: {
          'otel-tabs': {
            templateUrl: "templates/otel.html",
            controller: 'OtelCtrl'
          }
        }
      })
      .state('app.tab', {
        url: '/tab/:otelsId',
        views: {
          'menuContent': {
            templateUrl: 'templates/oteldetay.html',
            controller: 'OtelDetayCtrl'
          }
        }
      })
      .state('app.hakkimizda', {
        url: '/hakkimizda',
        views: {
          'menuContent': {
            templateUrl: 'templates/hakkimizda.html'
          }
        }
      })
      .state('app.kayit', {
        url: '/kayit',
        views: {
          'menuContent': {
            templateUrl: 'templates/kayit.html',
            controller: 'KayitCtrl'
          }
        }
      })
      .state('app.iletisim', {
        url: '/iletisim',
        views: {
          'menuContent': {
            templateUrl: 'templates/iletisim.html'
          }
        }
      })
      .state('app.forumkonuekle', {
        url: '/forumkonuekle',
        views: {
          'menuContent': {
            templateUrl: 'templates/forumkonuekle.html',
            controller: 'ForumKonuCtrl'
          }
        }
      })
      .state('app.playlists', {
        url: '/playlists',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlists.html',
            controller: 'PlaylistsCtrl'
          }
        }
      })
      .state('app.single', {
        url: '/playlists/:playlistId',
        views: {
          'menuContent': {
            templateUrl: 'templates/playlist.html',
            controller: 'PlaylistCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/tabs');
  });
