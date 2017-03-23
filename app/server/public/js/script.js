
$(document).ready(function() {
	$('h2').on('click', function(){
    $(this).parent().children("#review").toggleClass("hide")
	})
});
