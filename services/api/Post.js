import axios from "axios";

export const getAllPosts = async () => {
  const resp = await axios.get(`${process.env.API_URL}/api/posts`);

  return resp.data;
};
