const Converter = ({
	currencies,
	chosenCurrency,
	amount,
	handleCurrencyChange,
	handleAmountChange,
	isInputPositionedFirst
}) => {
	return (
		<div className="converter">
			<select value={chosenCurrency} onChange={(e) => handleCurrencyChange(e, isInputPositionedFirst)}>
				{Object.values(currencies).map(({ description, code }) => (
					<option
						key={code}
						title={description}
					>
						{code}
					</option>
				))}
			</select>
			<input className="amountInput" type="number" value={parseFloat(amount).toString()} min={0} onChange={(e) => handleAmountChange(e, isInputPositionedFirst)} />
			<p>{currencies[chosenCurrency]?.description}(s)</p>
		</div>
	)
}

export default Converter;