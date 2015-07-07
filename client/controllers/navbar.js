angular.module("studentTracker").controller("NavbarCtrl", ['$scope', '$meteor', '$stateParams', '$collection', '$location', '$modal', '$http',
  function($scope, $meteor, $stateParams, $collection, $location, $modal, $http){
    $meteor.autorun($scope,function (subscriptionHandle) {
    if(Meteor.user()){
      $scope.loginedIn = true;
      $scope.items = true;

    }
    else {$scope.loginedIn = false; $scope.items = false 
    //  $location.path('/checkin');
    }
});
    $scope.textInfo = function () {}
    $scope.logout = function () {console.log("logged Out"); $scope.loginedIn = false; Meteor.logout(); }
    $scope.loginModal = function () {
      console.log("Clicked");
         var modalInstance = $modal.open({
            templateUrl: 'loginModal.html',
            controller: 'loginModalCtrl',
            size: 'lg',
            resolve: {
              params: function () {
                return $scope.items;
              }
            }
          });
          modalInstance.result.then(function (callback) {
              
           }, function () {
          console.log('Modal dismissed at: ' , moment().format("h:mm a"));
        });
  
    }
  }]).controller('loginModalCtrl',['$scope', '$modalInstance','$meteor','params',function ($scope, $modalInstance,$meteor ,params) {
      $scope.login = function(){
        $scope.loginErrors = '';
        Meteor.loginWithPassword($scope.user, $scope.password, function(err){
          if (err){
            $scope.loginErrors = err.reason;
            console.log(err.reason);
          }
          else{
            $scope.user = $scope.password = $scope.loginErrors ='';
            setTimeout(function(){ $modalInstance.close(true); },10);
            
          }
        });
      }
      $scope.ok = function(){
             $modalInstance.close(true);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel'); 
      }     
    }]);
 
  $(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
  });  
});
  

