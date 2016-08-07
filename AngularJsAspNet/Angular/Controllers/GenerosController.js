module.exports = function ($routeParams, $location, GenerosService) {    
    
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
            listGeneros();
        },
        alterSort: function (column) {            
            vm.table.sortColumn = column;
            if (vm.table.sort == "asc") vm.table.sort = "desc"; else vm.table.sort = "asc";
            listGeneros();
        },
    };            

    vm.generos;

    vm.genero;

    if (vm.action == "edit") vm.genero = GenerosService.genero;

    var listGeneros = function () {
      
        var param = {
            currentPage: vm.table.currentPage,
            maxSize: vm.table.maxSize,
            sortColumn: vm.table.sortColumn,
            sort: vm.table.sort,
        };
        
        GenerosService.list(param).then(function (response) {            
            vm.generos = response.data.generos;
            vm.table.totalItems = response.data.totalItems;
        }, function (response) {
            swal("Ops!", "Ocorreu um erro!", "error");
        });
        

    };
    
    if (vm.action == "list") listGeneros();

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