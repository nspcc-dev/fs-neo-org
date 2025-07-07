async function getNetworkInfo() {
	const response = await fetch('https://rest.fs.neo.org/v1/network-info');
	const text = await response.json();
	return text;
}

const onUpdateCalculatorValue = (value, storagePrice, epochDuration, calculatorValue, calculatorPriceValue) => {
	let capacity = Math.pow(2, value);
	calculatorPriceValue.textContent = ((capacity / 1024) * storagePrice * (30 * 24 * 60 * 60) / epochDuration  / 1e12).toFixed(8);
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
}

$(document).ready(function () {
	$('.navbar-toggler').click(function (e) {
		e.preventDefault();
		if ($('.navbar-collapse').hasClass('show')) {
			$('.navbar-collapse').removeClass('show');
		} else {
			$('.navbar-collapse').addClass('show');
		}
	});

	let storagePrice = 100000;
	let epochDuration = 3600;
	getNetworkInfo().then((networkInfo) => {
		if (networkInfo.storagePrice) {
			storagePrice = networkInfo.storagePrice;
			epochDuration = networkInfo.epochDuration;
		}
	}).finally(() => {
		const calculatorValue = document.querySelector("#calculator_value");
		const calculatorPriceValue = document.querySelector("#calculator_price_value");
		const calculator = document.querySelector("#range");
		if (calculator) {
			calculator.value = 10;
		}

		onUpdateCalculatorValue(10, storagePrice, epochDuration, calculatorValue, calculatorPriceValue)
		$("#range").on('input', (e) => onUpdateCalculatorValue(e.target.value, storagePrice, epochDuration, calculatorValue, calculatorPriceValue));
	});
});
