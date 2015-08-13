warehouse.controller('productsController', ['$scope', 'productsFactory', '$interval', function($scope, productsFactory, $interval){

    var products_cache = [];
    $scope.products = [];
    $scope.is_loading = true;
    $scope.sort_type
    $scope.random = {
        last: 0
    }


    $scope.sortProducts = function (sort_type){
        $scope.sort_type = sort_type;
        $scope.products = [];
        products_cache = [];
        goForProducts();
    }

    $scope.loadMoreProducts = function (){
        if (products_cache.length == 0){
            goForProducts($scope.sort_type)
        }
        else{
            $scope.products = $scope.products.concat(products_cache.splice(0,10));
        }
    }

    function goForProducts(){
        startLoading();
        
        productsFactory.getProducts({offset: $scope.products.length, sort: $scope.sort_type, done: stopLoading}).then(
            function(){}, 
            function(error){
                console.log("Something goes wrong while we went for products... sorry :(");
                stopLoading()
            },
            function(node) {
                $scope.products.push(node);
            }
        );
    };

    function goForCachedProducts(){
        productsFactory.getProducts({offset: $scope.products.length + products_cache.length, sort: $scope.sort_type}).then(
            function(){}, 
            function(error){},
            function(node) {
                products_cache.push(node);
            }
        );
    }

    function stopLoading(){
        $scope.is_loading = false;
    };

    function startLoading(){
        $scope.is_loading = true;
    }

    function idleLoadProducts(){
        $interval(function(){
            //if ($scope.is_loading == false){
                goForCachedProducts();
            //}
        }, 5000);
    }

    idleLoadProducts();

}]);