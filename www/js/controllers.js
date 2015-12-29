angular.module('app.controllers', [])

.controller('AppCtrl', function($scope, $state, AuthService) {

  $scope.logout = function(){
    AuthService.logout();
  };

  $scope.$on('auth-logout', function(e, rejection) {
    $state.go('login');
  });

  $scope.$on('auth-login-required', function(e, rejection) {
    $state.go('login');
  });

})

.controller('loginCtrl', function($scope, $state, $ionicPopup, AuthService, RegService) {

  $scope.user = {
    username: 'tsvetok77@yandex.ru',
    password: 'PArol12345'
  };

  $scope.$on('auth-login', function(e, rejection) {
    $state.go('main.user.profile');
  });

  $scope.$on('auth-login-failed', function(event, data){
    $ionicPopup.alert({
      title: 'Login failed!',
      template: data
    });
  });

  $scope.login = function() {
    AuthService.login($scope.user);
  };
})

.controller('regCtrl', function($scope, $state, $ionicPopup, RegService) {

  RegService.getToken();

  $scope.data = {
    email: 'ihor.mihal@gmail.com',
    phone: '0734058015',
    confirmation: 'email',
    country: 1,
    user: null,
    code: null
  };

  $scope.stepOne = function() {
    RegService.one($scope.data)
    .then(function(data) {
      console.log(data.user);
      $scope.data.user = data.user;
      $state.go('reg.two');
      console.log($scope.data);
    },function(error) {
      $ionicPopup.alert({
        title: 'Error!',
        template: error
      });
    });
  };

  $scope.stepTwo = function() {
    console.log($scope.data);
    RegService.two($scope.data)
    .then(function(data) {
      $state.go('reg.three');
    },function(error) {
      $ionicPopup.alert({
        title: 'Error!',
        template: error
      });
    });
  };

  $scope.stepThree = function(){
    RegService.three($scope.user)
    .then(function(data) {
      $state.go('main.user.profile');
    },function(error) {
      $ionicPopup.alert({
        title: 'Error!',
        template: error
      });
    });
  };
})

.controller('passwordRecoveryCtrl', function($scope, $state, $ionicPopup, RegService) {
  $scope.data = RegService.data;

  $scope.send = function() {
    RegService.passwordRecovery($scope.data.email, $scope.data.phone, $scope.data.type)
    .then(function(data) {
      $state.go('passwordRecoveryConformation');
    },function(data) {
      $ionicPopup.alert({
        title: 'Error!',
        template: data
      });
    });
  };

  $scope.confirm = function() {
    RegService.confirm($scope.data.code)
    .then(function(data) {
      $state.go('passwordReset');
    },function(error) {
      $ionicPopup.alert({
        title: 'Error!',
        template: error
      });
    });
  };

  $scope.restore = function() {
    RegService.passwordRestore($scope.data.password)
    .then(function(data) {
      $state.go('signin');
    },function(error) {
      $ionicPopup.alert({
        title: 'Error!',
        template: error
      });
    });
  };
})

.controller('userCtrl', function($scope, UserService) {
  $scope.user = UserService;
  $scope.update = function(){
    $scope.user.updateProfile($scope.user.profile);
  };
})

.controller('helpCtrl', function($scope) {

})

.controller('tripsCtrl', function($scope, TripService) {
  $scope.trips = TripService.getList();
  $scope.doRefresh = function(){
    $scope.trips = TripService.getList();
    $scope.$broadcast('scroll.refreshComplete');
  };
})

.controller('tripCtrl', function($scope, $stateParams, $ionicConfig, TripService, CheckService) {
  $scope.trip = {};
  $scope.trip = TripService.getOne($stateParams.id);
  $scope.checks = CheckService.getList();
  $scope.doRefresh = function(){
    $scope.checks = CheckService.getList();
    $scope.$broadcast('scroll.refreshComplete');
  };
})

.controller('checksCtrl', function($scope, $ionicModal, CheckService) {
  $scope.checks = CheckService.getList();
  $scope.doRefresh = function(){
    $scope.checks = CheckService.getList();
    $scope.$broadcast('scroll.refreshComplete');
  };

  $ionicModal.fromTemplateUrl('templates/checks/add-check.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $scope.addCheck = function(){

  };

})

.controller('checkCtrl', function($scope, $stateParams, $ionicModal, CheckService) {
  $scope.check = CheckService.getOne($stateParams.id);

  $ionicModal.fromTemplateUrl('templates/checks/add-check.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

})

;
