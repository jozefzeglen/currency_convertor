import React, {useEffect, useState } from "react";
import './App.css';
import CurrencyRow from "./CurrencyRow";

const url = `https://v6.exchangerate-api.com/v6/6cbbba97b763887effc4b36c/latest/USD`;

function App() {

  const [currencyOptions, setCurrncyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountFromCurrency, setAmountFromCurrency] = useState(true)

  let toAmount, fromAmount
  if(amountFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate ||0;
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.conversion_rates)[26]
        setCurrncyOptions([data.base_code, ...Object.keys(data.conversion_rates)])
        setFromCurrency(data.base_code)
        setToCurrency(firstCurrency)
        setExchangeRate(data.conversion_rates[firstCurrency])
      })
  }, [])

  useEffect(() => {
    if (fromCurrency !== undefined && toCurrency !== undefined) {
      fetch(`${url}?1=${fromCurrency}&2=${toCurrency}`)
        .then(res => res.json())
        .then(data => setExchangeRate(data.conversion_rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])


  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountFromCurrency(false)
  }


  return (
  <>
    <h1>Convert</h1>
    <CurrencyRow 
    currencyOptions={currencyOptions} 
    selecteCurrency={fromCurrency}
    onChangeCurrency = {e => setFromCurrency(e.target.value)}
    onChangeAmount = {handleFromAmountChange}
    amount = {fromAmount}
    />
    <div className="equals">=</div>
    <CurrencyRow 
    currencyOptions={currencyOptions} 
    selectedCurrency={toCurrency}
    onChangeCurrency = {e => setToCurrency(e.target.value)}
    onChangeAmount = {handleToAmountChange}
    amount = {toAmount}
    />
  </>
  );
}

export default App;
