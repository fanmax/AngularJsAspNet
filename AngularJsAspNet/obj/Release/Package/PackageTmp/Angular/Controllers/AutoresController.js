module.exports = function ($routeParams, $location, AutoresService) {    
    
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
            listAutores();
        },
        alterSort: function (column) {            
            vm.table.sortColumn = column;
            if (vm.table.sort == "asc") vm.table.sort = "desc"; else vm.table.sort = "asc";
            listAutores();
        },
    };            

    vm.autores;

    vm.autor;

    if (vm.action == "edit") vm.autor = AutoresService.autor;

    var listAutores = function () {
      
        var param = {
            currentPage: vm.table.currentPage,
            maxSize: vm.table.maxSize,
            sortColumn: vm.table.sortColumn,
            sort: vm.table.sort,
        };
        
        AutoresService.list(param).then(function (response) {            
            vm.autores = response.data.autores;
            vm.table.totalItems = response.data.totalItems;
        }, function (response) {
            swal("Ops!", "Ocorreu um erro!", "error");
        });
        

    };
    
    if (vm.action == "list") listAutores();

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