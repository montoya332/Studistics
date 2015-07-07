angular.module("studentTracker").config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function($urlRouterProvider, $stateProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $stateProvider
     
     .state('studentRecords', {
        url: '/studentRecords',
        templateUrl: 'client/information/studentRecords.ng.html',
        controller: 'StudentRecordsCtrl'
      })
     .state('contact', {
        url: '/contact',
        templateUrl: 'client/information/about.ng.html',
       // controller: 'StudentRecordsCtrl'
      })
     .state('home', {
        url: '/home',
        templateUrl: 'client/information/home.ng.html',
        //controller: 'UploadsCtrl'
      })
     .state('landingPage', {
        url: '/',
        templateUrl: 'client/information/landingPage.ng.html',
        //controller: 'UploadsCtrl'
      })
     
     .state('attendence', {
        url: '/attendence',
        templateUrl: 'client/information/attendence.ng.html',
        //controller: 'UploadsCtrl'
      })
     .state('checkin', {
        url: '/checkin',
        templateUrl: 'client/trackStudents/checkInStudents.ng.html',
        controller: 'CheckInStudentsCtrl'
      })
     .state('checkout', {
        url: '/checkout',
        templateUrl: 'client/trackStudents/checkOutStudents.ng.html',
        controller: 'CheckOutStudentsCtrl'
      })
     .state('checkinSummary', {
        url: '/checkinSummary',
        templateUrl: 'client/trackStudents/checkInSummary.ng.html',
        controller: 'GenericChartCtrl'
      })
     .state('attendenceReports', {
        url: '/attendenceReports',
        templateUrl: 'client/information/attendenceReports.ng.html',
        controller: 'AttendenceReportsCtrl'
      })
    
     

    $urlRouterProvider.otherwise('/');
  }]);
