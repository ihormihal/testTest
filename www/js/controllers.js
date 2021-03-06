/*
	General controllers
	&& ABOUT, TERMS OF USE SCREEN
*/

angular.module('app.controllers', [])

/*** START SCREEN CONTROLLER ***/
.controller('startCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
	$scope.next = function() {
		$ionicSlideBoxDelegate.next();
	};
	$scope.previous = function() {
		$ionicSlideBoxDelegate.previous();
	};
	$scope.slideChanged = function(index) {
		$scope.slideIndex = index;
	};
})


/*** PRIVATE AREA APP CONTROLLER ***/
.controller('AppCtrl', function($rootScope, $scope, $state, AuthService, Catalog) {

	/* Loading catalogs */
	$rootScope.loadCatalog = function(){
		if (window.localStorage['countries']) {
			$rootScope.countries = angular.fromJson(window.localStorage['countries']);
		} else {
			Catalog.query({
				name: 'country'
			}, function(data) {
				$rootScope.countries = data;
				window.localStorage['countries'] = angular.toJson(data);
			});
		}

		if (window.localStorage['transports']) {
			$rootScope.transports = angular.fromJson(window.localStorage['transports']);
		} else {
			Catalog.query({
				name: 'transport'
			}, function(data) {
				$rootScope.transports = data;
				window.localStorage['transports'] = angular.toJson(data);
			});
		}

		if (window.localStorage['currencies']) {
			$rootScope.currencies = angular.fromJson(window.localStorage['currencies']);
		} else {
			Catalog.query({
				name: 'currency'
			}, function(data) {
				$rootScope.currencies = data;
				window.localStorage['currencies'] = angular.toJson(data);
			});
		}
	};

	$rootScope.loadCatalog();

	$scope.logout = function() {
		AuthService.logout();
	};


})


/*** ABOUT PAGE CONTROLLER ***/
.controller('MessagesCtrl', function($scope, Messages) {
})


/*** ABOUT PAGE CONTROLLER ***/
.controller('aboutCtrl', function($scope) {

})

/*** TERMS PAGE CONTROLLER ***/
.controller('termsCtrl', function($scope) {

})
