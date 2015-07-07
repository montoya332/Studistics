  angular.module('studentTracker',['angular-meteor', 'ui.router', 'ui.bootstrap','googlechart']).filter('moment', function() {
    return function(dateString, format) {
    	var dt = dateString?moment(dateString).format(format):""
        return dt;
    };
});



  
