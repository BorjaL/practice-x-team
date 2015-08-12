warehouse.factory('productsFactory', ["$http", "$q", function ($http, $q){

	var service = {};

	service.getProducts = function(params){
		var defer = $q.defer();

		oboe('http://localhost:8000/api/products?sort=' + params.sort)
		.fail(function (error){
			defer.reject(error);
		}).node("{id}", function (node) {

			defer.notify(node);
            return oboe.drop;
        }).done(function (){

          	params.done();
            return oboe.drop;
        });

		return defer.promise;
	}

	return service;
}]);