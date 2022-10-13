import axios from "axios";
import { JSONParseAllProps } from "../utils";

export const getAllAnswersForPost = async (postId, sortBy = "createdAt") => {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/answers/posts/${postId}&sort=${sortBy}`
  );

  const parsedResp = JSONParseAllProps(resp.data);

  return parsedResp;
};
