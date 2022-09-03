// API provided by exchangerate.host
export const fetchExchange = async (from, to, amount = 1) => {
	const response = await fetch(
		`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}&places=2`
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
			fetchExchange(currency, "UAH").then((res) => {
				resultObj[currency] = res;
			})
		)
	);

	return resultObj;
};
