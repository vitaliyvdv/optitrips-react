onmessage = e => {
  let list = e.data.list;
  let code = e.data.current;
  let data = list.filter(item => item.value == code);
  let title = Object.keys(data).map(i => data[i].name);
  postMessage(String(title));
};
