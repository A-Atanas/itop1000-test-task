// API provided by exchangerate.host

export const fetchAllCurrencies = () => {
	const response = fetch("https://api.exchangerate.host/symbols")
		.then((response) => response.json())
		.then(({ symbols }) => symbols)
		.catch((error) => console.log("error", error));

	return response;
};

export const fetchExchangeRate = async (from, to) => {
	const response = await fetch(
		`https://api.exchangerate.host/convert?from=${from}&to=${to}`
	)
		.then((result) => result.json())
		.then(({ info: { rate } }) => rate)
		.catch((error) => console.log("error", error));

	return response;
};

export const fetchCurrenciesToUAHRates = async (...currencies) => {
	let resultObj = {};

	await Promise.all(
		currencies.map((currency) =>
			fetchExchangeRate(currency, "UAH").then((res) => {
				resultObj[currency] = res;
			})
		)
	);

	return resultObj;
};
