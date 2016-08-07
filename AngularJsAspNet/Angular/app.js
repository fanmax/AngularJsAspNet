require('angular');
require('angular-route');
require('angular-animate');
require('angular-messages');
require('angular-ui-bootstrap');
require('sweetalert');

//Require Controllers
var MainController = require('./Controllers/MainController');
var AutoresController = require('./Controllers/AutoresController');
var GenerosController = require('./Controllers/GenerosController');
var LivrosController = require('./Controllers/livrosController');

//Require Services
var AutoresService = require('./Services/AutoresService');
var GenerosService = require('./Services/GenerosService');
var LivrosService = require('./Services/LivrosService');


var app = angular.module('app', ['ngRoute', 'ngAnimate', 'ngMessages', 'ui.bootstrap']);

//Controllers
app.controller('MainController', ['$scope', MainController]);
app.controller('AutoresController', ['$routeParams', '$location', 'AutoresService', AutoresController]);
app.controller('GenerosController', ['$routeParams', '$location', 'GenerosService', GenerosController]);
app.controller('LivrosController', ['$routeParams', '$location', 'LivrosService', 'AutoresService', 'GenerosService', LivrosController]);

//Services
app.service('AutoresService', ['$http', '$httpParamSerializerJQLike', '$q', '$rootScope', AutoresService]);
app.service('GenerosService', ['$http', '$httpParamSerializerJQLike', '$q', '$rootScope', GenerosService]);
app.service('LivrosService', ['$http', '$httpParamSerializerJQLike', '$q', '$rootScope', LivrosService]);


app.route = function (root, folder) {
    
    if (root.action == 'add' || root.action == 'edit')
        return 'Angular/Pages/'+folder+'/form.html';

    return 'Angular/Pages/'+folder+'/'+root.action+'.html';
};

app.config(['$routeProvider','$locationProvider', function ($routeProvider,$locationProvider) {
    
    $routeProvider
        .when('/', {
            templateUrl: 'Angular/Pages/index.html',
            controller: 'MainController'
        })
        .when('/autores/:action', {
            templateUrl: function (url) { return app.route(url, 'autores') },
            controller: 'AutoresController as vm'
        })
        .when('/generos/:action', {
            templateUrl: function (url) { return app.route(url, 'generos') },
            controller: 'GenerosController as vm'
        })
        .when('/livros/:action', {
            templateUrl: function (url) { return app.route(url, 'livros') },
            controller: 'LivrosController as vm'
        })
        .otherwise({
            redirectTo: '/'
        });

}]);