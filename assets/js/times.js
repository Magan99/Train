var firebaseConfig = {
  apiKey: "AIzaSyDZMD631nXeCL7NFfx3vzCFU93za9J28fU",
  authDomain: "train-57a6b.firebaseapp.com",
  databaseURL: "https://train-57a6b.firebaseio.com",
  projectId: "train-57a6b",
  storageBucket: "train-57a6b.appspot.com",
  messagingSenderId: "178502994962",
  appId: "1:178502994962:web:d3eb3f439028fa90"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var trainname ="";
var destination ="";
var firsttime ="5:30";
var frequency=0;


$("#add-item").on("click", function (event) {
  event.preventDefault();

  trainname = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  frequency = $("#frequency").val().trim();
  firsttime = $("#firsttime").val().trim();


  database.ref().push({
    trainname: trainname,
    destination: destination,
    firsttime:firsttime,
    frequency:frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP

    


  });
    console.log("THis is the minute away: "+ trainname)
    console.log("THis is remain "+ destination)
    console.log("this is arrival"+ firsttime)
    console.log("this is frequency"+ frequency)
    console.log("this is nextTrain"+ dateAdded)
    
});

// Firebase watcher .on("child_added"
database.ref().on("child_added", function (snapshot) {
    var snapval = snapshot.val();
    var arrival = moment(snapval.firsttime, "hh:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(arrival), "minutes");
    var remainder = parseInt(diffTime % snapval.frequency);
    // Minutes until next train
    var minAway = parseInt(snapval.frequency) - remainder;
    // Calculate next train time 
    var nextTrain = moment().add(minAway, "minutes");
    // Convert minute to hour and minute format
    nextTrain = moment(nextTrain).format("hh:mm A");
    
    // console.log("THis is the minute away: "+ minAway)
    // console.log("THis is remain "+ remainder)
    // console.log("this is arrival"+ arrival)
    // console.log("this is frequency"+ frequency)
    // console.log("this is nextTrain"+ nextTrain)
    // console.log("this is diffTime"+ diffTime)
    
    // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(snapval.trainname),
    $("<td>").text(snapval.destination),
    $("<td>").text(snapval.frequency),
    $("<td>").text(nextTrain),
    $("<td>").text(minAway)
  );
  console.log(newRow)
  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
  $("#train-data").append(newRow);
});