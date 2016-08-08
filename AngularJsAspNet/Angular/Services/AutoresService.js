function AutoresService($http, $httpParamSerializerJQLike, $q, $rootScope) {

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";    

    service = this;

    service.autores;
    service.autor;

    service.list = function (param) {
                
        var result = $q.defer();

        $rootScope.loader = true;
        
        $http({
            url: '/autores/list',
            method: "POST",
            data: $httpParamSerializerJQLike(param),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function (response, status) {
            result.resolve(response);
        }, function (response) {            
            result.reject(response);
        }).finally(function () {
            $rootScope.loader = false;
        });

        return result.promise;

    }

    service.insert = function (data) {
        var result = $q.defer();
        $rootScope.loader = true;
        $http({
            url: '/autores/add',
            method: "POST",
            data: $httpParamSerializerJQLike(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function (response, status) {
            result.resolve(true);
        }, function (response) {
            result.reject(response);
        }).finally(function () {
            $rootScope.loader = false;
        });

        return result.promise;
    }

    service.update = function (data) {
        var result = $q.defer();
        $rootScope.loader = true;
        $http({
            url: '/autores/edit',
            method: "POST",
            data: $httpParamSerializerJQLike(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function (response, status) {
            result.resolve(true);
        }, function (response) {
            result.reject(response);
        }).finally(function () {
            $rootScope.loader = false;
        });
        return result.promise;
    }

    service.delete = function (data) {
        var result = $q.defer();
        $rootScope.loader = true;
        $http({
            url: '/autores/remove',
            method: "POST",
            data: $httpParamSerializerJQLike(data),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        }).then(function (response, status) {
            result.resolve(true);
        }, function (response) {            
            result.reject(response);
        }).finally(function () {
            $rootScope.loader = false;
        });

        return result.promise;
    }

}

AutoresService.$inject = ['$http', '$httpParamSerializerJQLike', '$q', '$rootScope'];
module.exports = AutoresService;