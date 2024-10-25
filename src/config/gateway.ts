import axios from "axios";

const gateway = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL ?? "http://localhost:3001"}`,
  timeout: 30000,
});

export default gateway;
