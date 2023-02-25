import { getFetchConfig } from "../http";
import { JSONParseAllProps } from "../utils";

export const getAllTags = async (language, sortBy = "createdAt") => {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/entities/tags?sort=${sortBy}`

  if(language){
    url += `&language=${language}`
  }

  const resp = await fetch(
    url, getFetchConfig()
  );

  const respJSON = await resp.json();

  const parsedResp = JSONParseAllProps(respJSON);


  return parsedResp;
};
