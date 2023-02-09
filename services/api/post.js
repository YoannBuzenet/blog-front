import { getFetchConfig } from "../http";
import { JSONParseAllProps } from "../utils";

export const getAllPosts = async (
  language = "en-us",
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
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts/${id}`,
    getFetchConfig()
  );

  const respJSON = await resp.json();

  return respJSON;
};

export const getOnePostbyTitle = async (title, searchLike = false, language = "fr-FR") => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts/title/${title}?like=${searchLike}&language=${language}`,
    getFetchConfig()
  );

  const respJSON = await resp.json();

  return respJSON;
};

export const savePost = async (post) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts`,
    getFetchConfig("POST", post, 'application/json'),
  );

  return resp.data;
};
