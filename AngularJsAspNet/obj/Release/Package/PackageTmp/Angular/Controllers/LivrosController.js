module.exports = function ($routeParams, $location, LivrosService, AutoresService, GenerosService) {    
    
    var vm = this;  

    vm.action = $routeParams.action;

    vm.table = {
        maxSize: 5,
        totalItems: 1,
        currentPage: 1,
        sort: "asc",
        sortColumn: "Id",
        setPage: function (pageNo) {
            vm.table.currentPage = pageNo;
        },
        pageChanged: function () {            
            listLivros();
        },
        alterSort: function (column) {            
            vm.table.sortColumn = column;
            if (vm.table.sort == "asc") vm.table.sort = "desc"; else vm.table.sort = "asc";
            listLivros();
        },
    };            

    vm.livros;

    vm.autores;
    vm.generos;

    vm.livro;

    if (vm.action == "edit") vm.livro = LivrosService.livro;

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

    var listLivros = function () {
      
        var param = {
            currentPage: vm.table.currentPage,
            maxSize: vm.table.maxSize,
            sortColumn: vm.table.sortColumn,
            sort: vm.table.sort,
        };
        
        LivrosService.list(param).then(function (response) {            
            vm.livros = response.data.livros;
            vm.table.totalItems = response.data.totalItems;
        }, function (response) {
            swal("Ops!", "Ocorreu um erro!", "error");
        });
        

    };
    
    if (vm.action == "list") listLivros();

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