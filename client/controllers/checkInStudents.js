angular.module("studentTracker").controller("CheckInStudentsCtrl", ['$scope', '$meteor', '$stateParams', '$collection', '$location', '$modal','$http',
  function($scope, $meteor, $stateParams, $collection, $location,$modal, $http){
    var me = this;
        if(Meteor.user()){} else {$location.path('/');}

    document.title = "Check In Students";
    // if(!Meteor.user()){
    //   $location.path('/');
    // }
    $scope.params ={};
    $scope.lastCheckedIn =[];
    $scope.loading =true;
    setTimeout(function(){
        me.refreshData();
      }, 1);
    
    $scope.refreshDataButton = function  () {
      me.refreshData();
    }
    me.refreshData = function(ids){
      console.log("Refresh Student Data");
      $meteor.call('getStudentsParams', ids).then(
        function(results){
          $scope.students = results;
          $scope.loading =false;
          //console.log("Results: ",results);
            // console.log("Count: ", results.length)
          },
          function(err){
            // Handle error
            console.log('failed', err);
            $scope.students = [];
          }
          );
    }
    me.removeHash = function (students){
      // console.log("students",students[0])
      // var output = [];
      // for (var i in students){
      //   output.push(angular.toJson(students[i]));
      // }
      var output = angular.toJson(students)
      console.log("output",output)
      return output;      
    }
    me.mapEvents = function(events){
      var fe = events.map(function(event){
        delete event.$$hashKey;
        return event
      }).filter(function(event){
        return event._id != null
      });
      //console.log(fe);
      return fe
    };
    me.sortNames = function  (names,argument,argument2) {
      var filterednames = names.filter(function(obj) {
        return (obj.lastName[0] >= argument) && (obj.lastName[0] <= argument2);
      });
      //console.log(filterednames)
      return filterednames;
    }
    $scope.open = function (letter1,letter2) {
      $scope.params.students = me.sortNames($scope.students,letter1,letter2);
      $scope.params.query = letter1 + ' - ' + letter2;
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceInCtrl',
        size: 'lg',
        resolve: {
          params: function () {
            return $scope.params;
          }
        }
      });

      modalInstance.result.then(function (callback) {
        //console.log("they clicked Ok",callback);
      //$scope.lastCheckedIn =[];
      var arr =[];
      var studentIds=[];
      $scope.loading =true;
      for (var i in callback){
        studentIds.push(callback[i]._id);
        arr.unshift(callback[i]);
        //$scope.lastCheckedIn.unshift(callback[i]);
      }
      $meteor.call('saveEvent', {'studentIds':studentIds ,'students':me.mapEvents(arr)}).then(
        function(results){
          for (var i in callback){
            $scope.lastCheckedIn.unshift(callback[i]);
          }
          me.refreshData();
            //$scope.students = results;
            
          },
          function(err){
            // Handle error
            console.log('failed', err);
          }
          );
      //$scope.lastCheckedIn =arr;

    }, function () {
      console.log('Modal dismissed at: ' , moment().format("h:mm a"));
    });

    };



  }]).controller('ModalInstanceInCtrl',['$scope', '$modalInstance', 'params',function ($scope, $modalInstance ,params) {
    console.log('Params:',params);
      $scope.headerTitle = params.students;
    var callback = [];
    $scope.studentsCheckedIn =[];
    if (params.students.length > 0){
      $scope.students = params.students.filter(function(obj) {
        return (!obj.checkinTime);

      });}
      else{
        $scope.studentsCheckedIn = params.students.filter(function(obj) {
          return (obj.checkinTime);
        });
      }

      //$scope.sortNamesCheck(params,false);
      $scope.toggleBoolean = function(student){
        //student.checkin = student.checkin?false:true;
        console.log('Bool:',student.checkinTime?"":moment().format("h:mm a") );
        student.checkinTime = student.checkinTime?"":moment().format("h:mm a")      
      };
      $scope.ok = function () {

        callback = $scope.students.filter(function(obj) {
          return (obj.checkinTime);
        });
        $modalInstance.close(callback);
      };
      $scope.cancel = function () {
        if ($scope.students){
          callback = $scope.students.filter(function(obj) {
            return (obj.checkinTime);
          });
          for (var i=0; i< callback.length; i++){
            //callback[i].checkinTime =false;
            callback[i].checkinTime ="";
          }

        };
        $modalInstance.dismiss('cancel'); 
      }     
    }]);
