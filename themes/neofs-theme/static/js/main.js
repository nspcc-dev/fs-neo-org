$(document).ready(function () {
	$('.navbar-toggler').click(function (e) {
		e.preventDefault();
		if ($('.navbar-collapse').hasClass('show')) {
			$('.navbar-collapse').removeClass('show');
		} else {
			$('.navbar-collapse').addClass('show');
		}
	});

	const calculatorValue = document.querySelector("#calculator_value");
	const calculatorPriceValue = document.querySelector("#calculator_price_value");
	const calculator = document.querySelector("#range");
	if (calculator) {
		calculator.value = 10;
	}
	$("#range").on('input', (event) => {
		let capacity = Math.pow(2, event.target.value);
		storagePrice = 100000;
		epochDuration = 240;
		timePerBlock = 15;
		calculatorPriceValue.textContent = ((capacity / 1024) * storagePrice * (30 * 24 * 60 * 60) / epochDuration / timePerBlock  / 10e12).toFixed(8);
		if (capacity < 1024) {
			measurement = 'MB';
		} else if (capacity < 1048576) {
			measurement = 'GB';
			capacity = capacity / 1024;
		} else {
			measurement = 'TB';
			capacity = capacity / 1024 / 1024;
		}
		calculatorValue.textContent = `${capacity} ${measurement}`;
	});
});
