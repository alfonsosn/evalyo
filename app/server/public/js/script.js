var professors = ["Zamfirescu, Christina",
"Schaffer, Cullen",
"Schweitzer, Eric",
"Vazquez-Abad, Felisa",
"Stamos, Ioannis",
"Xu, Jia",
"Xie, Lei",
"Khatchadourian",
"Mneimneh, Saad",
"Debroy, Saptarshi",
"Weiss, Stewart N.",
"Shankar, Subash",
"Epstein, Susan L.",
"Sakas, William G.",]

$(document).ready(function() {
	// $( "#classes" ).autocomplete({
	// 	 	source: professors
	//  });

	$('h2').on('click', function(){
    $(this).parent().children("#review").toggleClass("hide")
	})
});
