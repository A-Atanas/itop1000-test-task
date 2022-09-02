// API provided by exchangerate.host
export const fetchExchange = (from, to, amount) => {
	fetch(`https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`)
		.then((result) => result.json())
		.then(({ info: { rate } }) => console.log(rate))
		.catch((error) => console.log("error", error));
};
