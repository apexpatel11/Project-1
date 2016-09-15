// Variables

// api key
var authKey = "568e54cf50194bb4ba8376c58a643f37";

//limits number of articles shown
var numResults 	= 5;

// insert this into the query
var searchTerm = "";

// helps us keep track of articles printed to page
var articleCounter = 0;

// building the query
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key="
+ authKey + "&q=";

//functions

//making the call, getting the json output
function runQuery(numArticles, queryURL){

	$.ajax({url: queryURL, method: "GET"}) 
		.done(function(NYTData) {

			// iterating over an array of articles returned by api
			for (var i=0; i<numArticles; i++) {

					//counting up every time the loop runs the number of articles printed to the screen
					articleCounter++;

					//creating an empty div set to a variable
					var wellSection = $("<div>");
					
					//give it a class of well
					wellSection.addClass('well');
					
					// label each article with the number return it is
					wellSection.attr('id', 'articleWell-' + articleCounter)
					
					// put it on the page!
					$('#wellSection').append(wellSection);

					//append the article headline
					if(NYTData.response.docs[i].headline != "null") {
						$("#articleWell-"+ articleCounter).append('<h3 class="articleHeadline">'
						 + NYTData.response.docs[i].headline.main + "</h3>");
					}	

					// append rest of the data attributes
					$("#articleWell-"+ articleCounter).append('<h4 class="articleSnippet">'
					 + NYTData.response.docs[i].snippet + "</h4>");
					$("#articleWell-"+ articleCounter).append("<a href='"
					+ NYTData.response.docs[i].web_url + "'>" 
					+ NYTData.response.docs[i].web_url + "</a>");	
			}
		});

}
	
	// when user selects an option, do this
	$( "#statSelect" ).change(function() {

		// target the id of option the user selected
  		searchTerm = $(this).children(":selected").attr("id");

  		// reset the data everytime the user selects a new option
		articleCounter = 0;
		$("#wellSection").empty();

		//building the queryURL using the search term above
		queryURL = queryURLBase + searchTerm;

		// calling function with new parameters
		runQuery(numResults, queryURL);

		// prevents default behavior of element
		return false;
	});	