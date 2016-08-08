function AutoresController($routeParams, $location, NgTableParams, AutoresService) {
    
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

                return AutoresService.list(param).then(function (response) {
                    params.total(response.data.totalItems);
                    return response.data.autores;
                }, function (response) {
                    swal("Ops!", "Ocorreu um erro!", "error");
                });
            }
        });
    }

    vm.autor;

    if (vm.action == "edit") vm.autor = AutoresService.autor;    

    vm.submitForm = function (data) {        
        if (vm.action == "add") insert(data);
        if (vm.action == "edit") update(data);
    };    

    vm.edit = function (data) {        
        var autor = {};
        autor.Nome = data.Nome;
        autor.Id = data.Id;
        AutoresService.autor = autor;
        $location.path('/autores/edit');
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
            AutoresService.delete(data).then(function (response) {
                console.log(response);
                swal("Removido!", "Seu registro foi removido com sucesso.", "success");
                listAutores();
            }, function (response) {
                swal("Ops!", "Ocorreu um erro!", "error");
            });
        });
    };    

    var insert = function (data) {
        AutoresService.insert(data).then(function (response) {
            $location.path('/autores/list');
            swal("Com sucesso!", "O registro foi inserido!", "success");
        }, function (response) {
            swal("Ops!", "Ocorreu um erro!", "error");
        });
    }

    var update = function (data) {
        AutoresService.update(data).then(function (response) {
            $location.path('/autores/list');
            swal("Com sucesso!", "O registro foi alterado!", "success")
        }, function (response) {
            swal("Ops!", "Ocorreu um erro!", "error");
        });
    }
}

AutoresController.$inject = ['$routeParams', '$location', 'NgTableParams', 'AutoresService'];
module.exports = AutoresController;