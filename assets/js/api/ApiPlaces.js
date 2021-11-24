const API_Places = (country, currency, locale, query) => {
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
      query: query
    }
  });
};

export default API_Places;
