module.exports = function ($http, $httpParamSerializerJQLike, $q, $rootScope) {

    $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";    

    service = this;

    service.generos;
    service.genero;

    service.list = function (param) {
                
        var result = $q.defer();

        $rootScope.loader = true;
        
        $http({
            url: '/generos/list',
            method: "POST",
            data: $httpParamSerializerJQLike({
                'currentPage': param.currentPage,
                'maxSize': param.maxSize,
                'sortColumn': param.sortColumn,
                'sort': param.sort,
            }),
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
            url: '/generos/add',
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
            url: '/generos/edit',
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
            url: '/generos/remove',
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