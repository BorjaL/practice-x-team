warehouse.directive('advertising', function(){
	return{
		restrict: "EA",
		scope: {
			random: '='
		},
		replace: true,
		template : "<img class='ad' src='/ad/?r={{new_num}}'/>",
		link: function(scope, elem, attrs){
			
			do{
				scope.new_num = Math.floor(Math.random()*1000);
			} while (scope.new_num == scope.random.last);

			scope.random.last = scope.new_num;
		}
	};
});