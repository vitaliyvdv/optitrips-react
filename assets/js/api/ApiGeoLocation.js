const API_GeoLocation = ipAdress => {
  return axios({
    method: "get",
    url: "https://apility-io-ip-geolocation-v1.p.rapidapi.com/" + ipAdress,
    headers: {
      "x-rapidapi-host": "apility-io-ip-geolocation-v1.p.rapidapi.com",
      "x-rapidapi-key": process.env.API_RAPIDAPI_KEY,
      accept: "application/json"
    }
  });
};

export default API_GeoLocation;
