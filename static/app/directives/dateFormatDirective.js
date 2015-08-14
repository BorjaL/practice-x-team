warehouse.directive('dateFormat', function(){
	return{
		restrict: "EA",
		scope: {
			date: '@'
		},
		link: function(scope, elem, attrs){
			
			var actual_date = new Date(scope.date);
			var right_now = new Date();

			var time_diff = Math.abs(actual_date - right_now);
			var diff_days = Math.ceil(time_diff / (1000 * 3600 * 24));

			if (diff_days > 7){
				elem.html(actual_date);
			}
			else{
				elem.html(diff_days + " day" + shouldPutPlural(diff_days) + " ago");
			}
		}
	};

	function shouldPutPlural(days){
		if ( days !== 1 ){
			return "s"
		}
		else return ""
	}
});