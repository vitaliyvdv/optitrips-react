import API_Countries from "js/api/ApiCountries";

onmessage = e => {
  (async function () {
    try {
      const response = await API_Countries(e.data);
      const list = await response.data.Countries;
      await postMessage(list);
    } catch (error) {
      console.log("Countries: " + error);
    }
  })();
};
