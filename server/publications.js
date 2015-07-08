
Meteor.publish("users", function () {
  return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});
Meteor.publish('getStudents',
  function (params) {
    if (true) {// TODO: if (this.userId) {
      return Students.find({ });
    } else {        
      return null;              
      }
    }
    );
Meteor.publish('getStudentRecords',
  function (params) {
    if (true) {// TODO: if (this.userId) {
      return ReportCards.find({ });
    } else {        
      return null;              
      }
    }
    );
Meteor.publish('getStudent',
  function (studentId) {
    console.log("Publish Students  Id: ",studentId);
    if (true) {// TODO: if (this.userId) {
      return Students.find({_id: studentId });
    } else {        
      return null;              
      }
    }
    );
Meteor.publish('getEvent',
  function (params) {
  	var dt = moment().format("MM/DD/YYYY");
    if (true) {// TODO: if (this.userId) {
      return Events.findOne({ date: dt  });
    } else {        
      return null;              
      }
    }
    );

 Meteor.publish('events', function(){
  var dt = moment().format("MM/DD/YYYY");
    return Events.find({ date: dt  });//,{sort: {date: -1}}
  });