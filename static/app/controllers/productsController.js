warehouse.controller('ProductsController', ['$scope', 'productsFactory', '$interval', '$timeout', function($scope, productsFactory, $interval, $timeout){

    var products_cache = [];
    var is_loading = false;
    $scope.products = [];
    $scope.loading = true;
    $scope.end = false;
    $scope.sort_type = "id"
    $scope.random = {
        last: 0
    }


    $scope.sortProducts = function (sort_type){
        $scope.sort_type = sort_type;
        $scope.products = [];
        products_cache = [];
        checkAndGoProducts();
    }

    $scope.loadMoreProducts = function (){
        if (products_cache.length == 0){
            checkAndGoProducts();
        }
        else{
            $scope.products = $scope.products.concat(products_cache.splice(0,10));
        }
    }

    function checkAndGoProducts(){
        
        if ($scope.is_loading){
            $timeout($scope.loadMoreProducts, 500);
        }
        else{
            goForProducts(false);
        }
    }

    function goForProducts(isForCache){
        startLoading(isForCache);
        activateEndFlag();

        productsFactory.getProducts({limit: 10, offset: $scope.products.length + products_cache.length, sort: $scope.sort_type, done: stopLoading}).then(
            function(){}, 
            function(error){
                console.log("Something goes wrong while we went for products... sorry :(");
                stopLoading();
            },
            function(node) {
                $scope.end = false;

                if (isForCache){
                    products_cache.push(node);
                }
                else{
                    $scope.products.push(node);
                }
            }
        );

    };

    function stopLoading(){

        $scope.is_loading = false;

        if ($scope.loading){
            $scope.loading = false;
        }
    };

    function startLoading(isForCache){
        $scope.is_loading = true;

        if (!isForCache){
            $scope.loading = true;
        }  
    }

    function activateEndFlag(){
        $scope.end = true; 
    }

    function idleLoadProducts(){
        $interval(function(){
            if ($scope.is_loading == false){
                goForProducts(true);
            }
        }, 5000);
    }

    idleLoadProducts();

}]);