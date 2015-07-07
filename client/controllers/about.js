angular.module("studentTracker").controller("AboutCtrl", ['$scope', '$meteor', '$stateParams', '$collection', '$location', '$http','limitToFilter',
  function($scope, $meteor, $stateParams, $collection, $location, $http,limitToFilter){
  
    document.title = "Demo";
    console.log("hi Demo");
    $scope.projects=[{name:'White House West Wing',amount:700},{name:'EEOB',amount:300},{name:'new EEOB',amount:200}];
    $scope.venders=[{name:'Mario bro painters',amount:300},{name:'Bowser Demolition',amount:700},{name:'Toad Auto Mechanic',amount:100}];
    $scope.buildings=[{name:'Building A',amount:500},{name:'Building B',amount:200},{name:'Building C',amount:300}];
    $scope.members=[{name:'Bob',amount:200},{name:'Jane',amount:200},{name:'Aurora',amount:300}];
    $scope.selectedProject={name:'White House West Wing',amount:700};
    $scope.selectedVender={name:'mario bro painters',amount:300};
    $scope.selectedBuilding={name:'Building A',amount:500};
    $scope.selectedMember={name:'Bob',amount:200};
    $scope.amount=5000;

    $scope.ideas = [
    ['All ', 100]
  ];
  $scope.triggerProject =function(){
    $scope.ideas = [
    [$scope.projects[0].name, $scope.projects[0].amount],
    [$scope.projects[1].name, $scope.projects[1].amount],
    [$scope.projects[2].name, $scope.projects[2].amount]
  ];
  console.log("Showing:",$scope.ideas)
  $scope.amount=$scope.projects[0].amount+$scope.projects[1].amount+$scope.projects[2].amount;
    $scope.limitedIdeas = limitToFilter($scope.ideas, 3);
  };
  $scope.triggerVender =function(){
    $scope.ideas = [
    [$scope.venders[0].name, $scope.venders[0].amount],
    [$scope.venders[1].name, $scope.venders[1].amount],
    [$scope.venders[2].name, $scope.venders[2].amount]
  ];
  console.log("Showing:",$scope.ideas)
    $scope.amount=$scope.venders[0].amount+$scope.venders[1].amount+$scope.venders[2].amount;

    $scope.limitedIdeas = limitToFilter($scope.ideas, 3);
  };
  $scope.triggerBuilding =function(){
    $scope.ideas = [
    [$scope.buildings[0].name, $scope.buildings[0].amount],
    [$scope.buildings[1].name, $scope.buildings[1].amount],
    [$scope.buildings[2].name, $scope.buildings[2].amount]
  ];
  console.log("Showing:",$scope.ideas)
    $scope.amount=$scope.buildings[0].amount+$scope.buildings[1].amount+$scope.buildings[2].amount;

    $scope.limitedIdeas = limitToFilter($scope.ideas, 3);
  };
  $scope.triggerMember =function(){
    $scope.ideas = [
    [$scope.members[0].name, $scope.members[0].amount],
    [$scope.members[1].name, $scope.members[1].amount],
    [$scope.members[2].name, $scope.members[2].amount]
  ];
  console.log("Showing:",$scope.ideas)
    $scope.amount=$scope.members[0].amount+$scope.members[1].amount+$scope.members[2].amount;

    $scope.limitedIdeas = limitToFilter($scope.ideas, 3);
  };
  $scope.limitedIdeas = limitToFilter($scope.ideas, 1);
  $scope.trigger =function(){
    $scope.ideas = [
    [$scope.selectedProject.name, $scope.selectedProject.amount],
    [$scope.selectedVender.name, $scope.selectedVender.amount],
    [$scope.selectedBuilding.name, $scope.selectedBuilding.amount],
    [$scope.selectedMember.name, $scope.selectedMember.amount]
  ];
  console.log($scope.ideas)
    $scope.amount=$scope.selectedProject.amount+$scope.selectedVender.amount+$scope.selectedBuilding.amount+$scope.selectedMember.amount;

    $scope.limitedIdeas = limitToFilter($scope.ideas, 4);

  }

  }]).directive('hcPie', function () {
  return {
    restrict: 'C',
    replace: true,
    scope: {
      items: '='
    },
    controller: function ($scope, $element, $attrs) {
      console.log(2);

    },
    template: '<div id="container" style="margin: 0 auto">not working</div>',
    link: function (scope, element, attrs) {
      console.log(3);
      var chart = new Highcharts.Chart({
        chart: {
          renderTo: 'container',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false
        },
        title: {
          text: 'Reports Graph'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage}%</b>',
          percentageDecimals: 1
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              color: '#000000',
              connectorColor: '#000000',
              formatter: function () {
                return '<b>' + this.point.name + '</b>: ' + parseInt(this.percentage) + ' %';
              }
            }
          }
        },
        series: [{
          type: 'pie',
          name: 'Browser share',
          data: scope.items
        }]
      });
      scope.$watch("items", function (newValue) {
        chart.series[0].setData(newValue, true);
      }, true);
      
    }
  }
});