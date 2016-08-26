function LivrosController($routeParams, $location, $filter, LivrosService, NgTableParams, AutoresService, GenerosService) {
    
    var vm = this;  

    vm.action = $routeParams.action;      

    vm.autores;
    vm.generos;

    vm.livro;

    if (vm.action == "list") {
        vm.tableParams = new NgTableParams({
            page: 1,            
            sorting: { Titulo: "asc" }
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

                //console.log(param);
                

                return LivrosService.list(param).then(function (response) {
                    params.total(response.data.totalItems);
                    return response.data.livros;
                }, function (response) {
                    swal("Ops!", "Ocorreu um erro!", "error");
                });
            }
        });
    }

    if (vm.action == "edit") {
        vm.livro = LivrosService.livro;
        if (vm.livro == null) { $location.path('/livros/list'); }
        vm.livro.Valor = $filter('number')(vm.livro.Valor, 2);
        console.log(vm.livro.Valor);
        
    }

    if (vm.action == "edit" || vm.action == "add") {
        var param = {
            currentPage: 1,
            maxSize: 1000,
            sortColumn: 'Nome',
            sort: 'asc',
        };

        AutoresService.list(param).then(function (response) {
            vm.autores = response.data.autores;            
        }, function (response) {
            swal("Ops!", "Ocorreu um erro!", "error");
        });

        GenerosService.list(param).then(function (response) {
            vm.generos = response.data.generos;
        }, function (response) {
            swal("Ops!", "Ocorreu um erro!", "error");
        });
    }    

    vm.submitForm = function (data) {        
        if (vm.action == "add") insert(data);
        if (vm.action == "edit") update(data);
    };    

    vm.edit = function (data) {        
        var livro = data;        
        LivrosService.livro = livro;
        $location.path('/livros/edit');
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
            LivrosService.delete(data).then(function (response) {
                console.log(response);
                swal("Removido!", "Seu registro foi removido com sucesso.", "success");
                listLivros();
            }, function (response) {
                swal("Ops!", "Ocorreu um erro!", "error");
            });
        });
    };    

    var insert = function (data) {
        data.AutorId = data.Autores.Id;
        data.GeneroId = data.Generos.Id;
        LivrosService.insert(data).then(function (response) {
            $location.path('/livros/list');
            swal("Com sucesso!", "O registro foi inserido!", "success");
        }, function (response) {
            swal("Ops!", "Ocorreu um erro!", "error");
        });
    }

    var update = function (data) {        

        data.AutorId = data.Autores.Id;
        data.GeneroId = data.Generos.Id;        

        LivrosService.update(data).then(function (response) {
            $location.path('/livros/list');
            swal("Com sucesso!", "O registro foi alterado!", "success")
        }, function (response) {
            swal("Ops!", "Ocorreu um erro!", "error");
        });
    }    

}

LivrosController.$inject = ['$routeParams', '$location', '$filter', 'LivrosService', 'NgTableParams', 'AutoresService', 'GenerosService'];
module.exports = LivrosController;