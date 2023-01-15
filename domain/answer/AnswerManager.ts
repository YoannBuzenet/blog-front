import { Answer } from "./Answer";

export class AnswerManager {
  /**
   * Sort all answers from a one level array to a tree with parent/chdil relation for each answer (0(n))
   * @param answers
   * @returns sorted array
   */

  // Cette fonction prenait des Answers précédemment, mais pour passer des objets non classes aux enfants i la été choisi de prendre des raw objects
  static sortAnswers(answers) {
    let tempStorage: Record<string, Answer> = {};
    // We keep track of all ids
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      answer.childrenAnswers = [];

      tempStorage[answer.id] = answer;
    }

    // Every answer is going to be affected to its parent
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      if (answer.ParentAnswerId) {
        try {
          tempStorage[answer.ParentAnswerId].childrenAnswers = [
            ...tempStorage[answer.ParentAnswerId].childrenAnswers,
            answer,
          ];
        } catch (e) {
          console.log('e',e)
          console.error(
            "This answer could not be linked to a parent :",
            answer
          );
          console.log("tempStorage", tempStorage);
          console.log("answer.parentAnswerId", answer.ParentAnswerId);
        }
      }
    }
    // Getting root level of Answers
    let finalOBject = [];
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      if (!answer.ParentAnswerId) {
        finalOBject = [...finalOBject, answer];
      }
    }

    return finalOBject;
  }

  static fromJSONToDomain(answerJS: Record<string, any>): Answer {
    // console.log("answer received to be parsed", answerJS);
    const answer = Answer.builder()
      .id(answerJS.id)
      .content(answerJS.content)
      .userId(answerJS.UserId)
      .user(answerJS.User)
      .postId(answerJS.PostId)
      .parentAnswerId(answerJS.ParentAnswerId)
      .createdAt(answerJS.createdAt)
      .updatedAt(answerJS.updatedAt)
      .build();

    return answer;
  }
  static fromDomainToJSON(answer: Answer): Record<string,unknown> {
    console.log("answer received to be JSONed", answer);
    const answerJS = {
      id : answer.id,
      content : answer.content,
      UserId : answer.user.id,
      PostId : answer.postId,
      ParentAnswerId : answer.parentAnswerId,
      createdAt : answer.createdAt,
      updatedAt : answer.updatedAt,
      User : {
        id : answer.user.id,
        nickname : answer.user.nickname
      }
    }
  
    return answerJS;
  
  }
}


