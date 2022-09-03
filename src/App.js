import "./App.css";
import CommonExchangeRates from "./components/CommonExchangeRates";
import Footer from "./components/Footer";
import ConverterContainer from "./components/ConverterContainer";

function App() {
	return (
		<div className="App">
			<CommonExchangeRates />
			<ConverterContainer />
			<Footer />
		</div>
	);
}

export default App;
