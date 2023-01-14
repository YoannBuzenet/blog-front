import axios from "axios";
import { getFetchConfig } from "../http";
import { JSONParseAllProps } from "../utils";

export const getAllAnswersForPost = async (postId, sortBy = "createdAt") => {
  const resp = await axios.fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/answers/posts/${postId}&sort=${sortBy}`,getFetchConfig()
  );

  const respJSON = await resp.json();

  const parsedResp = JSONParseAllProps(respJSON);


  return parsedResp;
};
