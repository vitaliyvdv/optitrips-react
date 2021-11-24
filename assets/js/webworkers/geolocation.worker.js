import API_UserIP from "js/api/ApiUserIP";
import API_GeoLocation from "js/api/ApiGeoLocation";
//import API_CurrentPlace from 'js/api/ApiCurrentPlace';

onmessage = e => {
  (async function () {
    try {
      const userIP = await API_UserIP();
      const geoLocation = await API_GeoLocation(userIP.data.ip);
      const country = await geoLocation.data.ip.country;
      const city = await geoLocation.data.ip.city;

      //const current = await API_GeoLocation(userIP.data.ip);
      await postMessage({ country, city });
    } catch (error) {
      console.log("Geolocation: " + error);
      postMessage("");
    }
  })();
};
