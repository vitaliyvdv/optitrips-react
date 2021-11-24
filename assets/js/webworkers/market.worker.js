onmessage = e => {
  let locale;
  let currency;

  switch (e.data) {
    case "CZ":
      locale = "cs-CZ";
      currency = "CZK";
      break;
    case "DK":
      locale = "da-DK";
      currency = "DKK";
      break;
    case "DE":
      locale = "de-DE";
      currency = "EUR";
      break;
    case "AT":
      locale = "de-DE";
      currency = "EUR";
      break;
    case "CH":
      locale = "de-DE";
      currency = "CHF";
      break;
    case "IT":
      locale = "it-IT";
      currency = "EUR";
      break;
    case "LI":
      locale = "de-DE";
      currency = "CHF";
      break;
    case "BE":
      locale = "en-US";
      currency = "EUR";
      break;
    case "UK":
    case "GB":
      locale = "en-GB";
      currency = "GBP";
      break;
    case "IE":
      locale = "en-GB";
      currency = "EUR";
      break;
    case "US":
      locale = "en-US";
      currency = "USD";
      break;
    case "AU":
      locale = "en-GB";
      currency = "AUD";
      break;
    case "NZ":
      locale = "en-GB";
      currency = "NZD";
      break;
    case "CA":
      locale = "en-GB";
      currency = "CAD";
      break;
    case "ES":
      locale = "es-ES";
      currency = "EUR";
      break;
    case "FR":
      locale = "fr-FR";
      currency = "EUR";
      break;
    case "HU":
      locale = "hu-HU";
      currency = "HUF";
      break;
    case "NL":
      locale = "nl-NL";
      currency = "EUR";
      break;
    case "LU":
      locale = "en-US";
      currency = "EUR";
      break;
    case "NO":
      locale = "nb-NO";
      currency = "NOK";
      break;
    case "PL":
      locale = "pl-PL";
      currency = "PLN";
      break;
    case "PT":
      locale = "pt-PT";
      currency = "EUR";
      break;
    case "RO":
      locale = "ro-RO";
      currency = "RON";
      break;
    case "FI":
      locale = "fi-FI";
      currency = "EUR";
      break;
    case "SE":
      locale = "sv-SE";
      currency = "SEK";
      break;
    case "SK":
      locale = "en-US";
      currency = "EUR";
      break;
    case "SI":
      locale = "en-US";
      currency = "EUR";
      break;
    case "EE":
      locale = "en-US";
      currency = "EUR";
      break;
    case "LV":
      locale = "en-US";
      currency = "EUR";
      break;
    case "LT":
      locale = "en-US";
      currency = "EUR";
      break;
    case "AD":
      locale = "en-US";
      currency = "EUR";
      break;
    case "MC":
      locale = "fr-FR";
      currency = "EUR";
      break;
    case "TR":
      locale = "tr-TR";
      currency = "TRY";
      break;
    case "BG":
      locale = "en-US";
      currency = "BGN";
      break;
    case "GR":
      locale = "el-GR";
      currency = "EUR";
      break;
    case "HR":
      locale = "en-US";
      currency = "HRK";
      break;
    case "RS":
      locale = "en-US";
      currency = "RSD";
      break;
    case "RU":
      locale = "ru-RU";
      currency = "RUB";
      break;
    case "UA":
      locale = "uk-UA";
      currency = "UAH";
      break;
    case "BY":
      locale = "ru-RU";
      currency = "USD";
      break;
    case "MD":
      locale = "ro-RO";
      currency = "MDL";
      break;
    default:
      locale = process.env.DEFAULT_LOCALE;
      currency = process.env.DEFAULT_CURRENCY;
      break;
  }
  postMessage({ locale, currency });
};
