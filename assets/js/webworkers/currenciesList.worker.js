import API_Currencies from "js/api/ApiCurrencies";

onmessage = e => {
  (async function () {
    try {
      const response = await API_Currencies();
      const list = await response.data.Currencies.filter(
        item =>
          item.Code == "RUB" ||
          item.Code == "UAH" ||
          item.Code == "USD" ||
          item.Code == "EUR" ||
          item.Code == "SEK" ||
          item.Code == "DKK" ||
          item.Code == "NOK" ||
          item.Code == "GBP" ||
          item.Code == "CHF" ||
          item.Code == "CZK" ||
          item.Code == "HUF" ||
          item.Code == "PLN" ||
          item.Code == "RON" ||
          item.Code == "TRY" ||
          item.Code == "BGN" ||
          item.Code == "MDL" ||
          item.Code == "HRK" ||
          item.Code == "RSD" ||
          item.Code == "AUD" ||
          item.Code == "CAD" ||
          item.Code == "NZD"
      );
      await postMessage(list);
    } catch (error) {
      console.log("Currencies: " + error);
    }
  })();
};
