import axios from "axios";
import { getFetchConfig } from "../http";
import { JSONParseAllProps } from "../utils";

export const getAllPosts = async (
  language = "EN",
  limit = 10,
  sortBy = "createdAt"
) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts?language=${language}&limit=${limit}&sortBy=${sortBy}`,getFetchConfig()
  );
  const respJSON = await resp.json();

  const parsedResp = JSONParseAllProps(respJSON);


  return parsedResp;
};

export const getOnePost = async (id) => {
  const resp = await axios.fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts/${id}`,
    getFetchConfig()
  );

  const respJSON = await resp.json();

  return respJSON;
};

export const savePost = async (post) => {
  const resp = await axios.fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts`,
    getFetchConfig("POST",post),
  );

  return resp.data;
};
