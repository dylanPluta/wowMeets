import { session } from "./axiosConfig";

export const getRealms = async () => {
  try {
    const response = await session.get("/getRealm");
    return response;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};
