angular.module("studentTracker").controller("CheckOutStudentsCtrl", ['$scope', '$meteor', '$stateParams', '$collection', '$location', '$modal','$http',
  function($scope, $meteor, $stateParams, $collection, $location,$modal, $http){
    var me = this;
        if(Meteor.user()){} else {$location.path('/');}

    document.title = "Check Out Students";
    console.log("Check Out Students");
    // if(!Meteor.user()){
    //   $location.path('/');
    // }
    $scope.loading =true;
    $scope.dt = moment().format("MM/DD/YYYY");
    $scope.eventPassed = $meteor.object(Events,{date: $scope.dt},false);

    var subscriptionHandle;
    $meteor.subscribe('events').then(function(handle) {
      subscriptionHandle = handle;
      var temp = $scope.eventPassed;
      $scope.students = temp.checkedIn
      $scope.loading =false;
      console.log("Total: ", temp.total)
    });

    $scope.$on('$destroy', function() {
      subscriptionHandle.stop();
    });
    

          // setTimeout(function(){
          //         //$scope.dt = moment("2/1/1989").format("MM/DD/YYYY");
          //         //$scope.eventPassed = $meteor.object(Events,{date: $scope.dt},false);
          //        }, 20);

    //=======================================
    $scope.params ={};
    $scope.lastCheckedIn =[];

    me.mapStudents = function(students){
      var fe = students.map(function(student){
        delete student.$$hashKey;
        return student
      }).filter(function(student){
        return student._id != null
      });
      //console.log(fe);
      return fe
    };
    me.sortNames = function  (names,argument,argument2) {
      var filterednames = names.filter(function(obj) {
        return (obj.lastName[0] >= argument) && (obj.lastName[0] <= argument2);
      });
      console.log(filterednames)
      return filterednames;
    }
    $scope.open = function (letter1,letter2) {
      $scope.params.students = me.sortNames($scope.students,letter1,letter2);
      $scope.params.query = letter1 + ' - ' + letter2;
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: 'lg',
        resolve: {
          params: function () {
            return $scope.params;
          }
        }
      });

      modalInstance.result.then(function (callback) {
        //console.log("they clicked Ok",callback);
        //$scope.students =callback;
        $scope.loading =true;
        $meteor.call('saveEventOut', {'dt':$scope.dt ,'students':me.mapStudents($scope.students)}).then(
        function(results){
          $scope.loading =false;

          },
          function(err){
            // Handle error
            console.log('failed', err);
          }
          );
       

    }, function () {
      console.log('Modal dismissed at: ' , moment().format("h:mm a"));
    });

    };



  }]).controller('ModalInstanceCtrl',['$scope', '$modalInstance', 'params',function ($scope, $modalInstance ,params) {
    console.log('Params:',params);
      $scope.headerTitle = params.query;
    var callback = [];
    $scope.studentsCheckedOut =[];
    if (params.students.length > 0){
      $scope.students = params.students.filter(function(obj) {
        return (!obj.checkoutTime);

      });}
      else{
        $scope.studentsCheckedOut = params.students.filter(function(obj) {
          return (obj.checkoutTime);
        });
      }

      //$scope.sortNamesCheck(params,false);
      $scope.toggleBoolean = function(student){
        console.log('Before:',student.checkoutTime, "obj", student);
        student.checkoutTime = student.checkoutTime?null:moment().format("h:mm a");
        console.log('After:',student.checkoutTime, "obj", student);      
      };
      $scope.ok = function () {

        // callback = $scope.students.filter(function(obj) {
        //   return (obj.checkoutTime);
        // });
        $modalInstance.close($scope.students);
      };
      $scope.cancel = function () {
        if ($scope.students){
          // callback = $scope.students.filter(function(obj) {
          //   return (obj.checkoutTime);
          // });
          for (var i=0; i< $scope.students.length; i++){
            $scope.students[i].checkoutTime =null;
        }
        };

        $modalInstance.dismiss('cancel'); 
      }     
    }]);
