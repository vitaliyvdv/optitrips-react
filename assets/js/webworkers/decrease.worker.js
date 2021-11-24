onmessage = e => {
  let value = Number(e.data);
  postMessage(Number(value - 1));
};
