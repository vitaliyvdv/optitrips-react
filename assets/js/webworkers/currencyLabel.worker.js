onmessage = e => {
  let currency = e.data.currency;
  let data = e.data.currenciesList.filter(item => item.Code == currency);
  let symbol = Object.keys(data).map(k => data[k].Symbol);
  postMessage(String(currency + " (" + symbol + ")"));
};
