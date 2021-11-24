const API_CurrentPlace = (country, currency, locale, userId) => {
  return axios({
    method: "get",
    url:
      "https://" +
      process.env.API_RAPIDAPI_URL +
      "/apiservices/autosuggest/v1.0/" +
      country +
      "/" +
      currency +
      "/" +
      locale +
      "/",
    headers: {
      "x-rapidapi-host": process.env.API_RAPIDAPI_URL,
      "x-rapidapi-key": process.env.API_RAPIDAPI_KEY,
      Accept: "application/json"
    },
    params: {
      id: userId + "-ip"
    }
  });
};

export default API_CurrentPlace;
