import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log("axios function called");
    config.headers.Authorization = "Test front";
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
