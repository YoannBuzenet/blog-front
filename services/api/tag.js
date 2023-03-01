import { getFetchConfig } from "../http";
import { JSONParseAllProps } from "../utils";

export const getAllTags = async (usedFor, language, sortBy = "createdAt") => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/entities/tags?sort=${sortBy}`

  if (language) {
    url += `&language=${language}`
  }
  if (usedFor) {
    url += `&usedFor=${usedFor}`
  }

  const resp = await fetch(
    url, getFetchConfig()
  );

  const respJSON = await resp.json();

  const parsedResp = JSONParseAllProps(respJSON);


  return parsedResp;
};

export const getAllImageTags = async (language, sortBy) => {
  return await getAllTags("image", language, sortBy)
}


export const getAllPostTags = async (language, sortBy) => {
  return await getAllTags("post", language, sortBy)
}
