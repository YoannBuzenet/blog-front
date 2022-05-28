import axios from "axios";

export const getAllPosts = async () => {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts`
  );

  return resp.data;
};

export const getOnePost = async (id) => {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts/${id}`
  );

  return resp.data;
};

// TODO - check que c'est la bonne URL
export const savePost = async (post) => {
  const resp = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts`,
    post
  );

  return resp.data;
};
