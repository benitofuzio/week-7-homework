$(document).ready(function() {

	var dataRef = new Firebase("https://vivid-inferno-9533.firebaseio.com/");

	
	$('#submit').on('click', function() {

	var trainIn = $('#trainName').val().trim();
	var destinationIn = $('#destination').val().trim();
	var trainTimeIn = $('#trainTime').val().trim();
	var frequencyIn = $('#frequency').val().trim();
	
	// First Time (pushed back 1 year to make sure it comes before current time)
	var firstTimeConverted = moment(trainTimeIn,"hh:mm").subtract(1, "years");
		console.log(firstTimeConverted);

	// Current Time
	var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

	// Time apart (remainder)
	var tRemainder = diffTime % frequencyIn; 
		console.log("time remainder: " + tRemainder);

	// Minute Until Train
	var tMinutesTillTrain = frequencyIn - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	// Next Train
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

	var arrival = moment(nextTrain).format("hh:mm");

		
		dataRef.push({
		name: trainIn,
		destination: destinationIn,
		frequency: frequencyIn,
		firstTime: firstTimeConverted._i,
		minutesAway: tMinutesTillTrain,
		nextArrival: arrival
		});

	$('#trainName').val("");
	$('#destination').val("");
	$('#trainTime').val("");
	$('#frequency').val("");

	return false;

});	

	//APPEND THE TRAIN DATA TO THE TABLE
	dataRef.on('child_added', function(childSnapshot, prevChildKey) {
		console.log("child" + childSnapshot.val());


		$(".table > tbody").append("<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination +
		 "</td><td>" + childSnapshot.val().frequency + "</td><td>" + childSnapshot.val().nextArrival + "</td><td>" + 
		 childSnapshot.val().minutesAway + "</td></tr>");
		});
	
}); //END DOCUMENT.READY