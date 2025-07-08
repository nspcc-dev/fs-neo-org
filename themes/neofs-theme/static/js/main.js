async function getNetworkInfo() {
	const response = await fetch('https://rest.fs.neo.org/v1/network-info');
	const text = await response.json();
	return text;
}

const onUpdateCalculatorValue = (value, replicas, storagePrice, epochDuration, calculatorValue, calculatorPriceValue, calculatorReplicasValue) => {
	let capacity = Math.pow(2, value);

	const pricePerOne = (capacity / 1024) * storagePrice * (30 * 24 * 60 * 60) / epochDuration  / 1e12;
	const totalPrice = (pricePerOne * replicas).toFixed(8);
	calculatorPriceValue.textContent = totalPrice;
	calculatorReplicasValue.textContent = replicas;
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
		const calculatorReplicasValue = document.querySelector("#calculator_replicas_value");
		const calculator = document.querySelector("#range");
		const replicas = document.querySelector("#range_replicas");
		if (calculator) calculator.value = 10;
		if (replicas) replicas.value = 3;

		onUpdateCalculatorValue(10, 3, storagePrice, epochDuration, calculatorValue, calculatorPriceValue, calculatorReplicasValue)
		$("#range").on('input', (e) => onUpdateCalculatorValue(e.target.value, replicas.value, storagePrice, epochDuration, calculatorValue, calculatorPriceValue, calculatorReplicasValue));
		$("#range_replicas").on('input', (e) => onUpdateCalculatorValue(calculator.value, e.target.value, storagePrice, epochDuration, calculatorValue, calculatorPriceValue, calculatorReplicasValue));
	});
});
