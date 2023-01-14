import axios from "axios";
import { JSONParseAllProps } from "../utils";

export const getAllPosts = async (
  language = "EN",
  limit = 10,
  sortBy = "createdAt"
) => {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts?language=${language}&limit=${limit}&sortBy=${sortBy}`
  );

  const parsedResp = JSONParseAllProps(resp.data);

  return parsedResp;
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
