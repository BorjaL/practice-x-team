warehouse.factory('productsFactory', ["$http", "$q", function ($http, $q){

	var service = {};

	service.getProducts = function(params){
		var defer = $q.defer();
		var counter = 0;

		oboe('http://localhost:8000/api/products?sort=' + params.sort + '&limit=' + params.limit + '&skip=' + params.offset)
		.fail(function (error){
			defer.reject(error);
		}).node("{id}", function (node) {

			defer.notify(node);
			counter++;
			return oboe.drop;
		}).done(function (data){

			if (counter == 10){
				params.done();
			}
			return oboe.drop;
		});

		return defer.promise;
	}

	return service;
}]);