import axios from "axios";

export const session = axios.create({
  baseURL: process.env.API_URL || "http://localhost:3001",
  withCredentials: true,
});

// npx json-server -p 6969 -w data/db.json
