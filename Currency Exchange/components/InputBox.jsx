import React, { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectCurrency = "usd",
  amountDisabled = false,
  currencyDisable = false,
}) {
  const amountInputId = useId();

  return (
    <div className="mb-4">
      <label htmlFor={amountInputId} className="block font-medium mb-2">
        {label}
      </label>

      <input
        id={amountInputId}
        type="number"
        placeholder="Amount"
        disabled={amountDisabled}
        value={amount}
        onChange={(e) =>
          onAmountChange && onAmountChange(Number(e.target.value))
        }
        className="border rounded px-3 py-2 w-full mb-2"
      />

      <p className="font-medium mb-1">Currency Type</p>
      <select
        value={selectCurrency}
        onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
        disabled={currencyDisable}
        className="border rounded px-3 py-2 w-full"
      >
        {currencyOptions.map((currency) => (
          <option key={currency} value={currency}>
            {currency.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}

export default InputBox;
