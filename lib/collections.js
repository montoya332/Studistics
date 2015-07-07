
Students = new Mongo.Collection('students');
//name
//dob
//id
//created
//notes[]
//attended
//lastUpdated
//Grades.grade.semester[subject:grade]
//year.semester[]
Events = new Mongo.Collection('events');// remove maybe add later for reports 
//creates
//eventId
//total
//date
//year.Attendance.date[{checkedIn:time,checkedOut:time}]  //date = yyyy/mm/dd
//createdBy


Attendances = new Mongo.Collection('attendances');
ReportCards = new Mongo.Collection('reportcards');