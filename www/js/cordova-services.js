angular.module('app.cordova', [])

.service('Toast', function($cordovaToast){
	return {
		show: function(data){
			var message = data;
			if(typeof message !== 'string'){
				message = angular.toJson(message);
			}
			try {
				$cordovaToast.show(message, 'short', 'top');
			} catch (error) {
				console.log(data);
			}
		}
	}
})

.service('Alert', function($cordovaDialogs){
	return {
		show: function(data){
			$cordovaDialogs.alert(data.message, data.title);
		}
	}
})

