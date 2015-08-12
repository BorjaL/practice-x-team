warehouse.directive('advertising', function(){
	return{
		restrict: "E",
		replace: true,
		template : "<img class='ad' src='/ad/?r="+new_num+"'/>",
		link: function(scope, elem, attrs){
				console.log(scope.new_num)
				var new_num;

				do{
					new_num = Math.floor(Math.random()*1000);
				} while (new_num == scope.last_random);

				scope.last_random = new_num;
				scope.new_num = new_num;
				console.log(scope.new_num)
		}
	};
});