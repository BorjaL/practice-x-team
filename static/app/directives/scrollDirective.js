warehouse.directive('scrollInTheEnd', function(){
	return{
		restrict: "E",
		link: function(scope, elem, attrs){
			
			$(window).scroll(checkScroll);

			function checkScroll() {
				if (areWeAtTheBottom()) {
					scope.loadMoreProducts();
				}
			}

			function areWeAtTheBottom() {
				return ($(window).scrollTop() >= ($(document).height() - $(window).height()));
			}
		}
	};
});