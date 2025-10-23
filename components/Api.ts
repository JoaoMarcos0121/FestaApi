import axios from "axios";

const Api = axios.create({
  baseURL: "https://www.jussimarleal.com.br/apievento/public/",
});

export default Api;

