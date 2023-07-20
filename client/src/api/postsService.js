import { session } from "./axiosConfig";

export const getPosts = async () => {
  try {
    const response = await session.get("/getPosts");
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (id) => {
  try {
    const response = await session.delete("/deletePost/" + id);
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const addNote = async (newNote) => {
  try {
    const result = await session.post("/createPost", newNote);
    return result;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};
