import axios from "axios";
import { JSONParseAllProps } from "../utils";

export const getAllTags = async (sort = "createdAt") => {
  const resp = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/entities/tags?sort=${sort}`
  );

  const parsedResp = JSONParseAllProps(resp.data);

  return parsedResp;
};
