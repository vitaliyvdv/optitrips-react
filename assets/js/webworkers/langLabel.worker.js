onmessage = e => {
  let data = e.data.LocaleList.filter(item => item.Code == e.data.locale);
  let name = Object.keys(data).map(k =>
    data[k].Code == "en-GB" || data[k].Code == "en-US"
      ? data[k].Name
      : data[k].Name.substring(0, data[k].Name.indexOf("("))
  );
  postMessage(String(name));
};
