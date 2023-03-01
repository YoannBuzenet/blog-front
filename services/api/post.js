import { getFetchConfig } from "../http";
import { JSONParseAllProps } from "../utils";

export const getAllPosts = async (
  language,
  limit,
  sortBy = "createdAt"
) => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts?sortBy=${sortBy}`;

  if (language) {
    url += `&language=${language}`
  }
  if (limit) {
    url += `&limit=${limit}`
  }

  const resp = await fetch(
    url, getFetchConfig()
  );
  const respJSON = await resp.json();

  const parsedResp = JSONParseAllProps(respJSON);


  return parsedResp;
};

export const getOnePostById = async (id) => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts/${id}`,
    getFetchConfig()
  );

  const respJSON = await resp.json();

  return respJSON;
};

export const getOnePostbyTitle = async (title, searchLike = false, language) => {

  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts/title/${title}?like=${searchLike}`;


  if (language) {
    url += `&language=${language}`
  }

  const resp = await fetch(
    url,
    getFetchConfig()
  );

  const respJSON = await resp.json();

  return respJSON;
};

export const getOnePostbyURL = async (url) => {

  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts/url/${url}`,
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

export const getPostByTags = async (tags, language) => {

  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/entities/posts/tags?tags=${tags}`;

  if (language) {
    url += `&language=${language}`
  }

  const resp = await fetch(
    url,
    getFetchConfig(),
  );

  const respJSON = await resp.json();

  return respJSON;

}
