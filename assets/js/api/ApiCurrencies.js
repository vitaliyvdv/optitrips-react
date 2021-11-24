const API_Currencies = () => {
  return axios({
    method: "get",
    url: "https://" + process.env.API_RAPIDAPI_URL + "/apiservices/reference/v1.0/currencies",
    headers: {
      "x-rapidapi-host": process.env.API_RAPIDAPI_URL,
      "x-rapidapi-key": process.env.API_RAPIDAPI_KEY,
      Accept: "application/json"
    }
  });
};

export default API_Currencies;
