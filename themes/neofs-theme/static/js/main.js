$(document).ready(function () {
	$('.navbar-toggler').click(function (e) {
		e.preventDefault();
		if ($('.navbar-collapse').hasClass('show')) {
			$('.navbar-collapse').removeClass('show');
		} else {
			$('.navbar-collapse').addClass('show');
		}
	});
});
