import { useState, useEffect } from 'react';
import { fetchCurrenciesToUAHRates } from "../api/api";

const CommonExchangeRates = () => {
	const [commonRates, setCommonRates] = useState({});

	useEffect(() => {
		fetchCurrenciesToUAHRates("USD", "EUR", "PLN").then(rates => setCommonRates(rates));
	}, []);

	return (
		<header>
			{Object.entries(commonRates).sort((a, b) => a[0].localeCompare(b[0])).map((rate) => (
				// Fetched currencies return in a random order, I sort them so their location doesn't change every time
				<div key={rate[0]}>
					<p>{rate[0]} {rate[1]}</p>
				</div>
			))}
		</header>
	)
}

export default CommonExchangeRates;