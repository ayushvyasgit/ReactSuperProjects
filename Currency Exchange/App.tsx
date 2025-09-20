import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import InputBox from "./components/InputBox";
import "./App.css";

function App() {
  const [amount, setAmount] = useState<number>(0);
  const [from, setFrom] = useState<string>("usd");
  const [to, setTo] = useState<string>("inr");
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo || {});

  // Swap currencies
  const swap = () => {
    const tempFrom = from;
    const tempAmount = amount;

    setFrom(to);
    setTo(tempFrom);
    setAmount(convertedAmount);
    setConvertedAmount(tempAmount);
  };

  // Convert
  const convert = () => {
    if (!currencyInfo || !currencyInfo[to]) return;
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 bg-orange-500 p-3 rounded">
        Currency Swap Index
      </h1>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        {/* Input Box for "From" */}
        <InputBox
          label="From"
          amount={amount}
          selectCurrency={from}
          onAmountChange={(val: number) => setAmount(val)}
          onCurrencyChange={(cur: string) => setFrom(cur)}
          currencyOptions={options}
        />

        <div className="flex justify-between items-center my-4">
          <button
            onClick={swap}
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition"
          >
            Swap
          </button>
          <button
            onClick={convert}
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
          >
            Convert
          </button>
        </div>

        {/* Input Box for "To" */}
        <InputBox
          label="To"
          amount={convertedAmount}
          selectCurrency={to}
          onAmountChange={() => {}}
          onCurrencyChange={(cur: string) => setTo(cur)}
          currencyOptions={options}
          amountDisabled={true}
        />
      </div>
    </div>
  );
}

export default App;
