import { Answer } from "./Answer";

export class AnswerManager {
  static sortAnswers(answers: Answer[]): Answer[] {
    let tempStorage: Record<string, Answer> = {};
    // We keep track of all ids
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      tempStorage[answer.id] = answer;
    }

    // Every answer is going to be affected to its parent
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      if (answer.parentAnswerId) {
        tempStorage[answer.parentAnswerId].childrenAnswers = [
          ...tempStorage[answer.parentAnswerId].childrenAnswers,
          answer,
        ];
      }
    }
    // Getting root level of Answers
    let finalOBject = [];
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      if (!answer.parentAnswerId) {
        finalOBject = [...finalOBject, answer];
      }
    }

    return finalOBject;
  }

  static fromJSONToDomain(answerJS: Record<string, any>): Answer {
    console.log("answer received to be parsed", answerJS);
    const answer = Answer.builder()
      .id(answerJS.id)
      .content(answerJS.content)
      .userId(answerJS.UserId)
      .postId(answerJS.PostId)
      .parentAnswerId(answerJS.ParentAnswerId)
      .createdAt(answerJS.createdAt)
      .updatedAt(answerJS.updatedAt)
      .build();

    return answer;
  }
}
