$( document ).ready(function() {

	$("#stats").hide();
	$("#news").hide();

	var states = ["Alaska","Alabama","Arkansas","Arizona","California","Colorado","Connecticut",
			"District of Colombia","Delaware","Florida","Georgia","Hawaii","Iowa","Idaho",
			"Illinois","Indiana","Kansas","Kentucky","Louisiana","Massachusetts","Maryland",
			"Maine","Michigan","Minnesota","Missouri","Mississippi","Montana",
			"North Carolina","North Dakota","Nebraska","New Hampshire","New Jersey",
			"New Mexico","Nevada","New York","Ohio","Oklahoma","Oregon",
			"Pennsylvania","Puerto Rico","Rhode Island","South Carolina",
			"South Dakota","Tennessee","Texas","Utah","Virginia","Vermont",
			"Washington", "Wisconsin", "West Virginia", "Wyoming"];

	function generateStateList() {
		for (var i=0; i<states.length; i++) {
			$("#povertyStatsTable tbody:last-child").append(
				'<tr><th><td class="stateName">' + states[i] + '</td>');
		}

	}

	generateStateList();


	$( "#statSelect" ).change(function() {


		if ($("#statSelect").val() !== "defaultVal") {	
			$("#stats").show();
			$("#news").show();
			var statChoice = $("#statSelect").val();
			var title = $(this).children(":selected").attr("data-name");
			$("#statsTitle").text(title);
		  	var queryStats = "http://api.census.gov/data/2009/acs5?get="+statChoice+"&for=state:*"
			$.ajax({url: queryStats, method: 'GET'})


				// once the api responds, run this function
			    .done(function(response) {
			    	$(".statResults").remove();
			    	$('tr').each(function(index) {
			    		if (index>0) {
		  					$(this).append('<td class="statResults">'+ response[index][0]+ '</td>');
		  				}
					});
			    });
		}
	});

});
