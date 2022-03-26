import axios from "axios";

export const getAllPosts = async () => {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts`
  );

  return resp.data;
};
