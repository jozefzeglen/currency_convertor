import React, {useEffect, useState } from "react";
import './App.css';
import CurrencyRow from "./CurrencyRow";


const url = `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}/latest/`;

function App() {

    const [currencyOptions, setCurrencyOptions] = useState([])
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()
    const [exchangeRate, setExchangeRate] = useState()
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

    let toAmount, fromAmount
    if (amountInFromCurrency) {
      fromAmount = amount
      toAmount = amount * exchangeRate || 0;
    } else {
      toAmount = amount
      fromAmount = amount / exchangeRate
    }


    useEffect(() => {
      fetch(`https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}/latest/EUR`)
        .then(res => res.json())
        .then(data => {
          const firstCurrency = Object.keys(data.conversion_rates)[26]
          setCurrencyOptions([ ...Object.keys(data.conversion_rates)])
          setFromCurrency(data.base_code)
          setToCurrency(firstCurrency)
          setExchangeRate(data.conversion_rates[firstCurrency])
        })
    }, [])

  useEffect(() => {
    if (fromCurrency !== undefined  && toCurrency !== undefined ) {
      fetch(`${url}${fromCurrency}?base_code=${fromCurrency}&conversion_rates=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.conversion_rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }


  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        onChangeAmount={handleFromAmountChange}
        amount={fromAmount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        onChangeAmount={handleToAmountChange}
        amount={toAmount}
      />
    </>
  );
}

export default App;
