import axios from "axios";

export const getAllPosts = async (limit = 10, sort = "createdAt") => {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts?limit=${limit}&sort=${sort}`
  );

  return resp.data;
};

export const getOnePost = async (id) => {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts/${id}`
  );

  return resp.data;
};

export const savePost = async (post) => {
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts`,
    post
  );

  return resp.data;
};
