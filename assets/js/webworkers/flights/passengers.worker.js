onmessage = e => {
  let passengers;
  passengers = e.data.adults + e.data.children + e.data.infants;
  postMessage(passengers);
};
