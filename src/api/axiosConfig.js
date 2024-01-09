import axios from "axios";

export default axios.create({
  baseURL: "https://dbparkir.my.id/api",
  withCredentials: true,
});
