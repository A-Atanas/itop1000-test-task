import Converter from "./Converter.jsx";
import { useState, useEffect } from "react";
import { fetchAllCurrencies, fetchExchangeRate } from "../api/api";

const ConverterContainer = () => {

	const [currencies, setCurrencies] = useState({});
	const [currency1, setCurrency1] = useState("USD");
	const [amount1, setAmount1] = useState(0);
	const [currency2, setCurrency2] = useState("EUR");
	const [amount2, setAmount2] = useState(0);
	useEffect(() => { fetchAllCurrencies().then(data => setCurrencies(data)) }, []);

	const [rate, setRate] = useState(0);
	const changeRateAndAmount = (from, to) => {
		fetchExchangeRate(from, to).then(data => {
			setRate(data);
			if (from === currency1) {
				setAmount1((amount2 / data).toFixed(2));
			}
			if (to === currency2) {
				setAmount2((amount1 * data).toFixed(2));
			}
		})
	}
	useEffect(() => { changeRateAndAmount("USD", "EUR") }, []);

	const swapCurrencies = () => {
		const [a, b] = [currency2, currency1];
		const [c, d] = [amount2, amount1];
		setCurrency1(a);
		setCurrency2(b);
		setAmount1(c);
		setAmount2(d);
		changeRateAndAmount(a, b);
	}

	const handleCurrencyChange = ({ target: { value } }, isInputPositionedFirst) => {
		if (isInputPositionedFirst) {
			if (value === currency2) {
				swapCurrencies();
			} else {
				changeRateAndAmount(value, currency2);
				setCurrency1(value);
			};
		} else {
			if (value === currency1) {
				swapCurrencies();
			} else {
				changeRateAndAmount(currency1, value);
				setCurrency2(value);
			};
		};
	}

	const handleAmountChange = ({ target: { value } }, isInputPositionedFirst) => {
		if (isInputPositionedFirst) {
			setAmount1(value);
			setAmount2((value * rate).toFixed(2));
		} else {
			setAmount2(value);
			setAmount1((value / rate).toFixed(2));
		}
	}

	return (
		<div id="convertersContainer">
			<h1>Choose currencies that you want to learn exchange rates of</h1>
			<div id="conversionForm">
				<Converter
					currencies={currencies}
					chosenCurrency={currency1}
					amount={amount1}
					isInputPositionedFirst={true}
					handleCurrencyChange={handleCurrencyChange}
					handleAmountChange={handleAmountChange}
				/>
				<div>
					<button id="swapButton" onClick={() => swapCurrencies()}>Swap</button>
					<h1>=&gt;</h1>
				</div>
				<Converter
					currencies={currencies}
					chosenCurrency={currency2}
					amount={amount2}
					isInputPositionedFirst={false}
					handleCurrencyChange={handleCurrencyChange}
					handleAmountChange={handleAmountChange}
				/>
			</div>
		</div>
	)
}

export default ConverterContainer;