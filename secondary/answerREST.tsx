import axios from "axios";

export type responseDTO = {
  content: string;
  UserId: number;
  PostId: number;
  ParentAnswerId: number;
};

export class AnswerREST {
  static async create(response: responseDTO) {
    return axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/entities/answers`,
      response
    );
  }
}
