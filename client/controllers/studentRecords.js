angular.module("studentTracker").controller("StudentRecordsCtrl", ['$scope', '$meteor', '$stateParams', '$collection', '$location', '$modal','$http',
  function($scope, $meteor, $stateParams, $collection, $location,$modal, $http){
    var me = this;
    if(Meteor.user()){} else {$location.path('/');}
    $scope.editButton = false;
    $scope.selectedStudent = {};
    $scope.params ={};
    $scope.message ="";
    $scope.newSubject = {name:"",grade:"",grade2:""};
    $scope.params.firstName = $scope.params.lastName = $scope.params.studentId ="";
    $meteor.call('getStudentRecord',  {firstName:$scope.params.firstName,lastName:$scope.params.lastName,studentId: $scope.params.studentId}).then(
        function(data){
      // Handle success
      $scope.selectedStudent = data;
      $scope.selectedGradeNum = 7;
      console.log("Student: ",$scope.selectedStudent)
      console.log("Student: ",$scope.selectedStudent.grades)
    },
      function(err){
        // Handle error
        console.log('failed', err);
      });
    
    $scope.saveNewSubject = function(grade){
      var obj =  $scope.newSubject;  //{"name":$scope.newSubject.name,"grade":$scope.newSubject.grade,"grade2":$scope.newSubject.grade2};
      if ($scope.newSubject.name){
          $scope.selectedStudent.grades[grade].push(obj);
          $scope.newSubject = {name:"",grade:"",grade2:""};
          }
      };
    $scope.toggleEdit = function(){
             $scope.editButton = $scope.editButton?me.save():true;
             console.log("Clicked Button",$scope.editButton)
      };
    $scope.changeSelectedGrade = function(grade){
     // me.saveGrade();
      $scope.selectedGradeNum = grade;
      //me.checkGrade();
      
    };

    $scope.checkImprovement = function(grade,grade2){
      var result = label =  '';
      if (grade && grade2){
       if (grade > grade2){result = "Improved"; label= "label label-success"}
        else if (grade == grade2){result = "Same";label= "label label-warning"}
          else {result = "Decreased";label= "label label-danger"}  
        }
      return {'result':result,'label':label}
    };
    $scope.submitNote = function(){
      //var note = []
      //note.push({"message":$scope.message,"dateCreated":moment()});//.format("MM/DD/YYYY")
      if ($scope.message.length > 5){
      $meteor.call('updateStudentNotes', $scope.selectedStudent._id , $scope.message).then(
        function(data){
      // Handle success
      console.log('success');
      
      var arr = $scope.selectedStudent.notes?$scope.selectedStudent.notes:[];
      arr.unshift({"message":$scope.message,"dateCreated":new Date()});//.format("MM/DD/YYYY")
      $scope.selectedStudent.notes = arr;
      $scope.message ="";
    },
      function(err){
        // Handle error
        console.log('failed', err);
      });
    }
    };
    me.save = function(){
      console.log($scope.selectedStudent, $scope.selectedGrade);
      //$scope.selectedStudent.grades.seventh = $scope.selectedGrade;
      //me.checkGrade();
      $meteor.call('updateStudentInfo',  $scope.selectedStudent).then(
        function(data){

      // Handle success
      console.log('success');
      $scope.editButton = false;
    },
      function(err){
        // Handle error
        console.log('failed', err);
      });
    };
    me.searchStudentRecords = function(params){
    	var templastName =$scope.params.lastName
      $meteor.call('getStudentRecords', {
      	firstName:$scope.params.firstName,
      	lastName:$scope.params.lastName,
      	studentId:$scope.params.studentId }).then(
        function(results){
        	$scope.params.students = results?results:[];
        	var modalInstance = $modal.open({
		        templateUrl: 'studentRecordsModal.html',
		        controller: 'StudentRecordsModalCtrl',
		        size: 'lg',
		        resolve: {
		          params: function () {
		            return $scope.params;
		          }
		        }
		      });
        	modalInstance.result.then(function (callback) {
              $scope.selectedStudent = callback;
              $scope.selectedGrade = callback.grades.seventh;
		       }, function () {
		      console.log('Modal dismissed at: ' , moment().format("h:mm a"));
		    });
          
          },
          function(err){
            // Handle error
            console.log('failed', err);
            $scope.students = [];
          }
          );
    }


    	$scope.toggleEditButton = function () {
    		$scope.editButton = $scope.editButton?false:true;
    	}
     $scope.open = function () {
      // $scope.params.students = me.sortNames($scope.students,letter1,letter2);
      // $scope.params.query = letter1 + ' - ' + letter2;
      me.searchStudentRecords();
    };

      
  }]).controller('StudentRecordsModalCtrl',['$scope', '$modalInstance','$meteor' ,'params',function ($scope, $modalInstance,$meteor ,params) {
    console.log('Params:',params);
      
    	$scope.students = params.students

      $scope.params = {firstName:'',lastName:'',studentId:''};
    	$scope.searchStudentRecords = function(params){

      $meteor.call('getStudentRecords', {firstName:$scope.params.firstName,lastName:$scope.params.lastName,studentId:""}).then(
        function(results){
         // console.log(results);
        	$scope.students  = results;        
          },
          function(err){
            // Handle error
            console.log('failed', err);
            $scope.students = [];
          }
          );
    }
      //$scope.sortNamesCheck(params,false);
      $scope.selectStudent = function(student){
             $modalInstance.close(student);
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
