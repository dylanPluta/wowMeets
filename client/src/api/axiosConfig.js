import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_PROXY || 'http://localhost:3001';

export const session = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// npx json-server -p 6969 -w data/db.json
