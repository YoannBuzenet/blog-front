import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // TODO Mettre un vrai header quand le back filtrera les requetes auth
    console.log("middleware axios log");
    config.headers.Authorization = "Test front";
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
