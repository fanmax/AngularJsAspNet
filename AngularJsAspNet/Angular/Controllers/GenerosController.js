function GenerosController($routeParams, $location, NgTableParams, GenerosService) {
    
    var vm = this;  

    vm.action = $routeParams.action;              

    if (vm.action == "list") {
        vm.tableParams = new NgTableParams({
            page: 1,
            sorting: { Nome: "asc" }
        }, {
            getData: function (params) {

                var param = {
                    currentPage: params.page(),
                    maxSize: params.count(),
                    filter: params.filter(),
                    sortColumn: "",
                    sort: "",
                    filter: params.filter()
                };

                if (params.orderBy()[0]) {
                    var orderBy = params.orderBy()[0];
                    param.sortColumn = orderBy.substring(1);
                    param.sort = orderBy[0] == '+' ? 'asc' : 'desc';
                }

                return GenerosService.list(param).then(function (response) {
                    params.total(response.data.totalItems);
                    return response.data.generos;
                }, function (response) {
                    swal("Ops!", "Ocorreu um erro!", "error");
                });
            }
        });
    }

    vm.genero;

    if (vm.action == "edit") vm.genero = GenerosService.genero;   

    vm.submitForm = function (data) {        
        if (vm.action == "add") insert(data);
        if (vm.action == "edit") update(data);
    };    

    vm.edit = function (data) {        
        var genero = {};
        genero.Nome = data.Nome;
        genero.Id = data.Id;
        GenerosService.genero = genero;
        $location.path('/generos/edit');
    };

    vm.delete = function (data) {              
        swal({
            title: "Deseja remover?",
            text: "Confirmando será removido este registro",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Sim, remova!",
            closeOnConfirm: false
        },
        function () {            
            GenerosService.delete(data).then(function (response) {
                console.log(response);
                swal("Removido!", "Seu registro foi removido com sucesso.", "success");
                listGeneros();
            }, function (response) {
                swal("Ops!", "Ocorreu um erro!", "error");
            });
        });
    };    

    var insert = function (data) {
        GenerosService.insert(data).then(function (response) {
            $location.path('/generos/list');
            swal("Com sucesso!", "O registro foi inserido!", "success");
        }, function (response) {
            swal("Ops!", "Ocorreu um erro!", "error");
        });
    }

    var update = function (data) {
        GenerosService.update(data).then(function (response) {
            $location.path('/generos/list');
            swal("Com sucesso!", "O registro foi alterado!", "success")
        }, function (response) {
            swal("Ops!", "Ocorreu um erro!", "error");
        });
    }
}

GenerosController.$inject = ['$routeParams', '$location', 'NgTableParams', 'GenerosService'];
module.exports = GenerosController;