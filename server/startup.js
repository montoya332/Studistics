if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log("Checking if DB is Empty");
    if (Students.find().count() === 0) {
      var dt=   moment().format("MM/DD/YYYY");
      var time = moment().format("h:mm a");
      console.log("Created Some test Students");
      Attendances.insert({"date":dt,"students":[]});
      var firstnames = ['Arturo','Erik','Sagar','Sam','Bob','Melissa','Pancho','Loren','Elisa','Bella'];
      var lastnames = ['Montoya','Singh','Hills','Kennedy','Clinton','Trump','Quen','Storen','Villa','Luther'];
      for (i = 1; i < 11; i++) { 
        var firstname = (firstnames[i%10]).toString();
        var dob =  ([i]%12).toString()+"/"+([i]%28).toString()+"/1994";
        var id =  "S"+([i]%12).toString()+([i]%28).toString()+"12";
        for (j = 1; j < 11; j++) { 
        var lastname = (lastnames[j%10]).toString();
        Students.insert({ "notes":[],"grades":{"seventh":{},"eighth":{},"ninth":{},"tenth":{},"eleventh":{},"twelfth":{}},"studentId":id,"firstName":firstname, "lastName":lastname, "dob":dob });
        var temp = Students.findOne({"studentId":id,"firstName":firstname, "lastName":lastname});
        Attendances.update({"date":dt},
          { $push: { "students": { "SID":temp._id,"checkedIn":time,"checkedOut":time } } })
        ReportCards.insert({"SID":temp._id,
                            "grades":{"seventh":[{"math":"A","history":"A","science":"A","pe":"A"}],
                            "eighth":[{"math":"B","history":"A","science":"A","pe":"A"}], "ninth":[{"math":"C","history":"A","science":"A","pe":"A"}],"tenth":[{"math":"A","history":"A","science":"A","pe":"A"}],
                            "eleventh":[{"math":"B","history":"A","science":"A","pe":"A"}], "twelfth":[{"math":"A","history":"C","science":"A","pe":"A"}]} 
                          });


        }
      }


      Accounts.createUser({
         password: "123",
           email: "123@gmail.com",
           profile: {
             firstname: "test",
             lastname: "test"
           }
         });
    //console.log("Students",Students.findOne());
    console.log("Attendances",Attendances.findOne());
    console.log("ReportCards",ReportCards.findOne().grades);
  }
    
    // else {console.log("Created Some test Events",Students.find({}).fetch())}
    // if (Events.find().count() === 0) {
    //   console.log("Created Some test Events");
    //   var dt = new Date();
    //   for (i = 1; i < 11; i++) { 
    //     for (j = 1; j < 11; j++) { 
    //     var id =  "S"+([i]%12).toString()+([i]%28).toString()+"12";
    //     Events.insert({ "eventId":id,"Attended":23, "Absent":2 , "date":dt});
    //     }
    //   }
    // }



  })
}