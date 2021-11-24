const API_UserIP = () => {
  return axios({
    method: "get",
    url: "https://api.ipify.org",
    params: {
      format: "json",
      callback: "?"
    },
    timeout: 2000
  });
};

export default API_UserIP;
