import React from 'react'

export default function CurrencyRow(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        onChangeAmount,
        amount
    } = props
  return (
    <div>
      <input type="number" className="input" value={amount} onChange={onChangeAmount}></input>
      <select value={selectedCurrency} onChange={onChangeCurrency}> 
        {currencyOptions.map((option, index) => (
            <option key={index} value={option}>{option}</option>
           ))}
        
      </select>
    </div>
  )
}
