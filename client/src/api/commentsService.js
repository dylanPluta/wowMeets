import { session } from "./axiosConfig";

export const getComments = async (id) => {
  try {
    const response = await session.get("/getComments");
    const result = response.data.filter((comment) => comment.postId == id);

    console.log("fetchComments");
    console.log(id);
    return result;
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else {
      console.log(`error: ${err.message}`);
    }
  }
};

export const addComments = async (newComment) => {
  try {
    const response = await session.post("/createComment", newComment);
    console.log("addComment");
    return response;
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};
