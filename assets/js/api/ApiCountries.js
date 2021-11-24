const API_Countries = locale => {
  return axios({
    method: "get",
    url: "https://" + process.env.API_RAPIDAPI_URL + "/apiservices/reference/v1.0/countries/" + locale,
    headers: {
      "x-rapidapi-host": process.env.API_RAPIDAPI_URL,
      "x-rapidapi-key": process.env.API_RAPIDAPI_KEY,
      Accept: "application/json"
    }
  });
};

export default API_Countries;
