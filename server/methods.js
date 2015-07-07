Meteor.methods({
  updateStudentNotes: function (studentId,message) {
    console.log("Update:", studentId,message);
    var note = []
    note.push({"message":message,"dateCreated":new Date()});//.format("MM/DD/YYYY")
      if (true) {// TODO: if (this.userId) {   
       Students.update( { _id: studentId  }, {
              $addToSet: {notes: { $each: note}}
            });
       
      } else {        
        return null;              
        }
      },
  updateStudentInfo: function (params) {
      console.log("updateStudentInfo:", params);
      if (this.userId) {// TODO: if (this.userId) {
       Students.update( { _id: params._id  }, {
              $set: {email: params.email,
                      grades: params.grades,
                      email: params.email,
                      phone: params.phone,
                      phone: params.phone,
                      g1name: params.g1name,
                      g1email: params.g1email,
                      g1phone: params.g1phone,
                      g2email: params.g2email,
                      g2name: params.g2name,
                      g2phone: params.g2phone,
                      joinedDate: params.joinedDate}
            });
       console.log("Update:", params);;
      } else {        
        return null;              
        }
      },
  getStudent: function (params) {
    console.log("getStudents");
      if (this.userId) {// TODO: if (this.userId) {
      return Students.findOne({_id: params._id});
      } else {        
        return null;              
        }
      },
  getStudents: function () {
    console.log("getStudents");
      if (this.userId) {// TODO: if (this.userId) {
      return Students.find({ },{sort: {lastName: 1, firstName: 1}}).fetch();
      } else {        
        return null;              
        }
      },
  getStudentRecords: function (params) {
    console.log("getStudentRecords");
      if (this.userId) {// TODO: if (this.userId) {
      return Students.find({
     $and: [
     //{studentId: {$regex: '^'+params.studentId, $options: 'i'}},
     {firstName: {$regex: '^'+params.firstName, $options: 'i'}},
     {lastName: {$regex: '^'+params.lastName, $options: 'i'}}
     ]
   },{
     limit: 10
    },{sort: {lastName: 1, firstName: 1}}).fetch();
      } else {        
        return null;              
        }
      },
  getStudentsParams: function (params) {
    console.log("getStudents  with params");
    var result=  Events.findOne({date: moment().format("MM/DD/YYYY")});
      if (this.userId) {// TODO: if (this.userId) {
        if (result){
            var temp = uniq_fastIds(result.checkedIn);
            console.log("Students Checked-in", temp.length);
            return Students.find({_id: {$nin: temp}},{sort: {lastName: 1, firstName: 1}}).fetch();
            
        }
        else{ console.log("No Students Checked-in");
        return Students.find({ },{sort: {lastName: 1, firstName: 1}}).fetch();}//Students.update({ _id: event._id }, {$addToSet: { checkedIn: { dt } }});}
      } else { 
      console.log("Error");       
        return null;              
        }
      },
  getEvents: function (params) {
    console.log("getEvents");
      if (this.userId) {// TODO: if (this.userId) {
      return Events.find({ }, {sort: {dateCreated: 1}}).fetch();
      } else {        
        return null;              
        }
      },   
  getEvent: function (params) {
    var dt=   moment().format("MM/DD/YYYY");
    console.log("getEvent", dt);
      if (true) {// TODO: if (this.userId) {
      return Events.findOne({date: dt});
      } else {        
        return null;              
        }
      },


  saveEvent: function (params) {
    //console.log("saveEvent",params.students);
    var dt = moment().format("MM/DD/YYYY");
    var result=  Events.findOne({date: dt});
    
      if (this.userId) {// TODO: if (this.userId) {
        if (result){
                Events.update( { date: dt  },
                               { $addToSet: { checkedIn: { $each: params.students } } });
                var r =  Events.findOne({date: dt});
                var uniq_checkedIn = uniq_fast(r.checkedIn);
               Events.update( { date: dt  },  
                                {$set:{ checkedIn:  uniq_checkedIn}});
               console.log("Modified",r.date);
                }
            else {console.log("Created",dt);
              var students = Students.find({ }).fetch();
              var id =eventId();
              console.log("Students",students.length);
              Events.insert({'createdBy':this.userId,'eventId':id, 'checkedIn': params.students,
                  'date': dt ,'dateCreated':moment(),'total':students.length
                });
              // Events.insert({ 'eventId':id, 'checkedIn': params.students,  
              //             'date': dt , 'dateCreated':moment()});
            }
      } else {        
        return null;              
        }
    },
      saveEventOut: function (params) {
    //console.log("saveEvent",params.students);  //{'dt':$scope.dt ,'students':$scope.students}
    var dt = params.dt ;//moment().format("MM/DD/YYYY");
    var result=  Events.findOne({date: dt});
    
      if (this.userId) {// TODO: if (this.userId) {
        if (result){
               Events.update( { date: dt  },  
                                {$set:{ checkedIn:  params.students}});
               console.log("Modified:",dt);
                }
            else {
              console.log("Error No Events In this Date",dt, params.students);
            }
      } else {        
        return null;              
        }
    }
    
  //,
});

function eventId() {
  function s1() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return moment().format("MM/DD/YYYY") + '-' + s1() + '-' + s1() + '-' +
    s1() + '-' + s1() ;
}

function uniq_fast(arr) {
    var seen = {};
    var out = [];
    var len = arr.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = arr[i];
         //console.log( item._id)
         if(seen[item._id] !== 1) {
               seen[item._id] = 1;
               out[j++] = item;
         }
    }
    console.log("Input:", arr.length, "Ouput:", out.length);
    return out;
}

function uniq_fastIds(arr) {
    var seen = {};
    var out = [];
    var len = arr.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = arr[i];
         //console.log( item._id)
         if(seen[item._id] !== 1) {
               seen[item._id] = 1;
               out[j++] = item._id;
         }
    }
    console.log("Input:", arr.length, "Ouput:", out.length);
    return out;
}

