import API_Places from "js/api/ApiPlaces";

onmessage = e => {
  (async function () {
    try {
      const query = await e.data.query;
      const response = await API_Places(e.data.country, e.data.currency, e.data.locale, query);
      const places = await response.data.Places;

      let word = query.charAt(0).toUpperCase() + query.slice(1);
      let newlist = places.filter(item => item.PlaceName.includes(word));
      if (newlist[0]) {
        postMessage({ list: places, firstMatch: newlist[0].PlaceId });
      } else {
        postMessage({ list: places, firstMatch: "" });
      }
    } catch (error) {
      console.log("Places list: " + error);
    }
  })();
};
