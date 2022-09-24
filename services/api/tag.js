import axios from "axios";
import { JSONParseAllProps } from "../utils";

export const getAllTags = async (language, sortBy = "createdAt") => {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/tags?language=${language}&sort=${sortBy}`
  );

  const parsedResp = JSONParseAllProps(resp.data);

  return parsedResp;
};
