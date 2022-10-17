import style from "../../styles/posts/AnswerPost.module.css";
import DisplayHTML from "../generic/wysiwyg/DisplayHTML";
import genericTextStyle from "../../styles/generic/genericTextStyle.module.css";
import { Answer } from "../../domain/answer/Answer";
import { useState } from "react";
import RichText from "../../components/generic/wysiwyg/RichText";
import { useSession } from "next-auth/react";
import { createEmptyField } from "../generic/wysiwyg/utils";
import { useLocalStorage } from "../../hooks/hooks";
import { toast } from "react-toastify";
import { AnswerREST } from "../../secondary/answerREST";
import { FormattedMessage } from "react-intl";

type AnswerPostProps = {
  answer: Answer;
  level: number;
  idPost: number;
  loadAnswers: Function;
};

const AnswerPost = ({
  answer,
  level = 0,
  idPost,
  loadAnswers,
}: AnswerPostProps) => {
  const { data: session, status } = useSession();
  const isUserAuthenTicated = status === "authenticated";

  // console.log("answer", answer);
  // console.log("level", level);

  const uniqueKeyAnswer = `idPost-${idPost}-idParentAnswer-${
    answer.parentAnswerId || "root"
  }`;

  const [isDisplayedWysiwyg, setIsDisplayedWysiwyg] = useState(false);
  const [response, setResponse] = useLocalStorage(
    uniqueKeyAnswer,
    createEmptyField()
  );

  const handlePostAnswer = async (e, textResponse) => {
    console.log("answer posted !");

    let stringifiedAnswer;
    try {
      stringifiedAnswer = JSON.stringify(textResponse);
    } catch (e) {
      toast.error(
        <p>
          <FormattedMessage
            id="answer.parsing.error"
            defaultMessage="There was an error parsing the answer."
          />
        </p>
      );
      return;
    }

    const answerPost = {
      content: stringifiedAnswer,
      UserId: answer.userId,
      PostId: idPost,
      ParentAnswerId: answer.id,
    };

    //TODO : redirect sur next et faire l'endpoint next
    try {
      const servResp = await AnswerREST.create(answerPost);
      toast.success(
        <p>
          <FormattedMessage
            id="answer.creation.success"
            defaultMessage="Your answer has been created."
          />
        </p>
      );
      // We clean the saved answer from Local Storage
      localStorage.removeItem(uniqueKeyAnswer);
      // We reload the answers
      loadAnswers();
    } catch (e) {
      toast.error(
        <p>
          <FormattedMessage
            id="answer.creation.error"
            defaultMessage="There has been an error while saving your answer. Please try later."
          />
        </p>
      );
    }
  };

  return (
    <div className={`${style.rootAnswer}`}>
      <div
        className={`${style.container} ${genericTextStyle.content}`}
        style={{ marginLeft: `${level * 3}rem` }}
      >
        <div className={style.splitter}>
          <div className={style.user}>{answer?.user?.nickname}</div>
          <div className={style.answerWysiwyg}>
            <DisplayHTML slateText={answer.content} />
          </div>
        </div>
        <div className={style.replyContainer}>
          {isUserAuthenTicated && (
            <p onClick={(e) => setIsDisplayedWysiwyg(!isDisplayedWysiwyg)}>
              Reply
            </p>
          )}
        </div>
        {isDisplayedWysiwyg && (
          <div className={style.wysiwygContainer}>
            <RichText
              value={response}
              setValue={setResponse}
              displayImagePicker={false}
              field={uniqueKeyAnswer}
            />
            <div className={style.buttonContainer}>
              <p onClick={(e) => handlePostAnswer(e, response)}>Poster</p>
            </div>
          </div>
        )}
      </div>
      {Array.isArray(answer.childrenAnswers) &&
        answer.childrenAnswers.map((answer) => {
          return (
            <AnswerPost
              answer={answer}
              level={level + 1}
              idPost={idPost}
              loadAnswers={loadAnswers}
            />
          );
        })}
    </div>
  );
};

export default AnswerPost;
