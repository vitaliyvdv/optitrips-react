onmessage = e => {
  let locale = e.data.locale;
  let country = e.data.country;
  let dateFormat;
  let lang;

  switch (true) {
    case locale == "en-US" && country == "US":
      dateFormat = "MM/dd/yyyy";
      break;
    case locale == "ru-RU":
    case locale == "uk-UA":
    case locale == "de-DE" && country != "CH":
    case locale == "nb-NO":
    case country == "RS":
    case locale == "fr-FR" && country == "FR":
    case country == "CH":
      dateFormat = "dd.MM.yyyy";
      break;
    case locale == "da-DK":
    case locale == "nl-NL":
    case locale == "pt-PT":
      dateFormat = "dd-MM-yyyy";
      break;
    case locale == "es-ES":
    case country == "BE":
    case locale == "en-GB" && country == "UK":
    case locale == "it-IT" || country == "IT":
      dateFormat = "dd/MM/yyyy";
      break;
    default:
      dateFormat = "yyyy-MM-dd";
      break;
  }

  switch (locale) {
    case "cs-CZ":
      lang = "cs";
      break;
    case "da-DK":
      lang = "da";
      break;
    case "de-DE":
      lang = "de";
      break;
    case "it-IT":
      lang = "it";
      break;
    case "es-ES":
      lang = "es";
      break;
    case "fr-FR":
      lang = "fr";
      break;
    case "nl-NL":
      lang = "nl";
      break;
    case "nb-NO":
      lang = "nb";
      break;
    case "pl-PL":
      lang = "pl";
      break;
    case "pt-PT":
      lang = "pt";
      break;
    case "ro-RO":
      lang = "ro";
      break;
    case "fi-FI":
      lang = "fi";
      break;
    case "sv-SE":
      lang = "sv";
      break;
    case "tr-TR":
      lang = "tr";
      break;
    case "el-GR":
      lang = "el";
      break;
    case "ru-RU":
      lang = "ru";
      break;
    case "uk-UA":
      lang = "ua";
      break;
    case "en-US":
      lang = "en-US";
      break;
    default:
      lang = "en-GB";
  }

  postMessage({ dateFormat: dateFormat, lang: lang });
};
