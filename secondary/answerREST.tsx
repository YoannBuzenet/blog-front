import axios from "axios";
import { authenticatedDTO } from "../types/types";

export type responseDTO = {
  content: string;
  UserId: number;
  PostId: number;
  ParentAnswerId: number;
};

export class AnswerREST {
  static async create(response: responseDTO & authenticatedDTO) {
    return axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/entities/answers`,
      response
    );
  }
}
