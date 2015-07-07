angular.module("studentTracker").controller("AttendenceReportsCtrl", ['$scope', '$meteor', '$stateParams', '$collection', '$location', '$http',
  function($scope, $meteor, $stateParams, $collection, $location, $http){
    var me = this;
        if(Meteor.user()){} else {$location.path('/');}

    $scope.totalCheckedIn = $scope.totalCheckedOut = 0;
    $scope.chartRows =[];
    $scope.chartColumns =  [ { "id": "N/A", "label": "Student", "type": "string", "p": {} }, { "id": "Absent", "label": "Absent", "type": "number", "p": {} }, { "id": "CheckedIn", "label": "Attended", "type": "number", "p": {} } ];
    setTimeout(function(){
      me.refreshData();
    }, 1);
    $scope.refreshDataButton = function  () {
      me.refreshData();

    }
    me.refreshData = function(){
      $meteor.call('getEvent', {}).then(
        function(results){
          if(results)   {
            $scope.students = results.checkedIn;
            $scope.total = results.total;
            $scope.totalCheckedIn = results.checkedIn.length;
            $scope.totalCheckedOut = me.countCheckedOut(results.checkedIn);
              // console.log("Results: ",results.checkedIn);
              console.log("Count: ", results.checkedIn.length);
              console.log("Total: ", results);
              var labels = {"l1":"Absent","l2":"CheckedIn","l3":"N/A"}
              setTimeout(function(){
                //  me.refreshGraphData(labels,$scope.students.length,$scope.total - $scope.students.length );
                }, 3);
            }
            else{
              $scope.students =[{"firstName": "No Students"}];
              setTimeout(function(){ me.refreshGraphData({"l1":"N/A","l2":"N/A","l3":"N/A"},1,1 ); }, 3);
            };
          },
          function(err){
            // Handle error
            console.log('failed', err);
            setTimeout(function(){ me.refreshGraphData({"l1":"N/A","l2":"N/A","l3":"N/A"},1,1 ); }, 3);
          }
          );
    }
    me.countCheckedOut = function(array){
            var count =0;
            for(x in array){
              count += array[x].checkoutTime?1:0;
            }
            return count;
        };
    me.refreshGraphData = function(labels,students,total){
      console.log("refreshGraphData: ");

      var chartRows =[
      { "c": [ { "v": labels.l1}, { "v": 0  } ]},//, "f": "42 items"
      { "c": [ { "v": labels.l2}, { "v": students  }  ]},
      { "c": [ { "v": labels.l3}, { "v": total } ] }
      ];

      var chartCols =  [
      { "id": "N/A", "label": "Student", "type": "string", "p": {} },
      { "id": "Absent", "label": "Absent", "type": "number", "p": {} },
      { "id": "CheckedIn", "label": "Attended", "type": "number", "p": {} } ];



      $scope.$apply(function() {
        $scope.chartObject = {
          "type": "ColumnChart",
          //"displayed": true,
          "data": {
            "cols": chartCols,
            "rows": chartRows
          },
          "options": {
            //"title": "Students per Month",
            "chartArea":{left:0,top:0,width:"100%",height:"97%"},//{left:0,top:0,width:'50%',height:'75%'}
            // "height": 200,
            // "width": 500,
            "isStacked": "false",
            "displayExactValues": true,
            "colors": ['#e2431e', '#6f9654', '#1c91c0', '#1c91c0',
            '#4374e0', '#5c3292', '#572a1a', '#999999', '#1a1a1a']
          },
          "formatters": {}
        }
    });


        
    }
    $scope.handleSelect=function(selection){
        console.log(selection);
    };
    $scope.downloadButton=function(){
        if($scope.students.length){
          me.download();
        }
    };

    me.download = function(){
        //var filename = "Student_Report-"+moment().format("M/D/YYYY")+".csv";
        var jsonObj =$scope.students;
        var rows = me.formatFile(jsonObj);
        var csvString = encodeURIComponent(rows.join("\n"));
        var a         = document.createElement('a');
        a.href        = 'data:attachment/csv,' + csvString;
        a.target      = '';
        var d = new Date();
        a.download    = "Student_Report-"+moment().format("M/D/YYYY")+".csv"; //csv
        document.body.appendChild(a);
            //console.log(a);
            a.click();
    };

    me.formatFile = function(array){
            var rows = [];
            rows.push(['Last Name','First Name','check-in Time','check-out Time','DOB']);
            for (var x in array) {
                rows.push(me.formatRow(array[x]).join(','));
            }
            
            return rows;
        };

        me.formatRow = function(jsonObj){
            var firstName =jsonObj.firstName?jsonObj.firstName:""
            var lastName =jsonObj.lastName?jsonObj.lastName:""
            var checkinTime =jsonObj.checkinTime?jsonObj.checkinTime:""
            var checkoutTime =jsonObj.checkoutTime?jsonObj.checkoutTime:""
            var dob =jsonObj.dob?jsonObj.dob:""
            return [lastName,firstName,checkinTime,checkoutTime,dob];
        };

//=================================================

//     $scope.onions = [
//         {v: "Onions"},
//         {v: 3},
//     ];

//     $scope.chartObject.data = {"cols": [
//     //       { "c": [ { "v": "Monday"}, { "v": 80  }, { "v": 79 }  ]},
// //       { "c": [ { "v": "Tuesday"}, { "v": 78  }, { "v": 77  }   ]},
// //       { "c": [ { "v": "Wednesday"}, { "v": 76  }, { "v": 76  }   ]},
// //       { "c": [ { "v": "Thursday"}, { "v": 77  }, { "v": 77  }   ]},
// //       { "c": [ { "v": "Friday"}, { "v": 75  }, { "v": 74  } ] }
//         {id: "t", label: "Topping", type: "string"},
//         {id: "s", label: "Slices", type: "number"}
//     ], "rows": [
//         {c: [
//             {v: "Mushrooms"},
//             {v: 3},
//         ]},
//         {c: $scope.onions},
//         {c: [
//             {v: "Olives"},
//             {v: 31}
//         ]},
//         {c: [
//             {v: "Zucchini"},
//             {v: 1},
//         ]},
//         {c: [
//             {v: "Pepperoni"},
//             {v: 2},
//         ]}
//     ]};


//     // $routeParams.chartType == BarChart or PieChart or ColumnChart...
//     $scope.chartObject.type = "ColumnChart";
//     $scope.chartObject.options = {
//         'title': 'Students',"chartArea":{left:0,top:0,width:"100%",height:"90%"}
//     }


    //+========Old Method
$scope.chartRows =[
      { "c": [ { "v": "Monday"}, { "v": 80  }, { "v": 79 }  ]},
      { "c": [ { "v": "Tuesday"}, { "v": 78  }, { "v": 77  }   ]},
      { "c": [ { "v": "Wednesday"}, { "v": 76  }, { "v": 76  }   ]},
      { "c": [ { "v": "Thursday"}, { "v": 77  }, { "v": 77  }   ]},
      { "c": [ { "v": "Friday"}, { "v": 75  }, { "v": 74  } ] }
      ];

      $scope.chartColumns =  [
      { "id": "N/A", "label": "Student", "type": "string", "p": {} },
      { "id": "Absent", "label": "Checked-In", "type": "number", "p": {} },
      { "id": "CheckedIn", "label": "Checked-Out", "type": "number", "p": {} } ];

    $scope.chartObject = {
      "type": "ColumnChart",
      //"displayed": true,
      "data": {
        "cols": $scope.chartColumns,
        "rows": $scope.chartRows
      },
      "options": {
        "title": "Students",
        //"isStacked": "false",
        //"displayExactValues": true,
        "chartArea":{left:0,top:0,width:"100%",height:"90%"},
        "colors": ['#e2431e', '#6f9654', '#1c91c0', '#1c91c0',
        '#4374e0', '#5c3292', '#572a1a', '#999999', '#1a1a1a']
      },
      "formatters": {}
    }  
}]);