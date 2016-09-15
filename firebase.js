//link to firebase
var dataRef = new Firebase("https://dollarsandsense.firebaseio.com/");
//vars for firebase

var statChoice = "";
var feedingAmericaCount = 0;
var plannedParenthoodCount =0;
var familytofamilyCount=0;
var nyt = "";
var name = "";
var email = "";
var dateAdded = "";
//collects the input from the signup form
function addUser () {

	$("#signupButton").on("click", function(){

		name = $("#nameInput").val().trim();
		email = $("#emailInput").val().trim();

			//sets it to firebase
			dataRef.push({
				name: name,
				email: email,
				dateAdded: Firebase.ServerValue.TIMESTAMP				
			});


	});

	//clear out the entries after push
	$("#nameInput").val("")
	$("#emailInput").val("")

}

function feedingAmericaClicks() {
	$("#feedingAmerica").on("click", function(){
		feedingAmericaCount++;
		dataRef.update({
			feedingAmericaCount: feedingAmericaCount,
		});

	});
}

function plannedParenthoodClicks() {
	$("#plannedParenthood").on("click", function(){
		plannedParenthoodCount++;
		dataRef.update({
			plannedParenthoodCount: plannedParenthoodCount,
		});
	});
}
function conserveClicks() {
	$("#familytofamily").on("click", function(){
		familytofamilyCount++;
		dataRef.update({
			familytofamilyCount: familytofamilyCount,
		});
	});
}

function statClicks() {
	$("#statSelect").change(function(){
		var statChoice=$(this).children(":selected").text();
			dataRef.push({
				statChoice : statChoice
			});
	});
}
addUser();
feedingAmericaClicks();
plannedParenthoodClicks();
conserveClicks();
statClicks();




