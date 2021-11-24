onmessage = e => {
  let data = e.data.countriesList.filter(item => item.Code == e.data.country);
  let name = Object.keys(data).map(i => data[i].Name);
  postMessage(String(name));
};
