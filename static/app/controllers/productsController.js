warehouse.controller('ProductsController', ['$scope', 'productsFactory', '$interval', '$timeout', function($scope, productsFactory, $interval, $timeout){

    var products_cache = [];
    var count_to_end = 0;
    $scope.products = [];
    $scope.is_loading = false;
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
            checkIfFinish();
        }
    }

    function goForProducts(isForCache){
        startLoading(isForCache);
        $scope.end = true; 

        productsFactory.getProducts({limit: 20, offset: $scope.products.length + products_cache.length, sort: $scope.sort_type, done: stopLoading}).then(
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

                count_to_end++;
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

    function checkIfFinish(){

    }

    function idleLoadProducts(){
        $interval(function(){
            if ($scope.is_loading == false){
                goForProducts(true);
            }
        }, 10000);
    }

    idleLoadProducts();

}]);