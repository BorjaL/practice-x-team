warehouse.controller('productsController', ['$scope', 'productsFactory', function($scope, productsFactory){

    $scope.products = [];
    $scope.isLoading = true;

    $scope.goForProducts = function goForProducts(sort_type){
        console.log("Hola")
        startLoading();
        $scope.products = [];
        productsFactory.getProducts({sort: sort_type, done: stopLoading}).then(
            function(){}, 
            function(error){
                console.log("Something goes wrong while we went for products... sorry :(");
                $scope.isLoading = false;
            },
            function(node) {
                $scope.products.push(node);
            }
        );
    };

    function stopLoading(){
        $scope.isLoading = false;
    };

    function startLoading(){
        $scope.isLoading = true;
    }

}]);