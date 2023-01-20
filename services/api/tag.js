import { getFetchConfig } from "../http";
import { JSONParseAllProps } from "../utils";

export const getAllTags = async (language, sortBy = "createdAt") => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/tags?language=${language}&sort=${sortBy}`, getFetchConfig()
  );

  const respJSON = await resp.json();

  const parsedResp = JSONParseAllProps(respJSON);


  return parsedResp;
};
