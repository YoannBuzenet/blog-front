import style from "../../styles/posts/AnswerPost.module.css";
import DisplayHTML from "../generic/wysiwyg/DisplayHTML";
import genericTextStyle from "../../styles/generic/genericTextStyle.module.css";
import { Answer } from "../../domain/answer/Answer";
import { useState } from "react";
import RichText from "../../components/generic/wysiwyg/RichText";
import { useSession } from "next-auth/react";
import { createEmptyField } from "../generic/wysiwyg/utils";
import { useLocalStorage } from "../../hooks/hooks";

type AnswerPostProps = {
  answer: Answer;
  level: number;
  idPost: number;
};

const AnswerPost = ({ answer, level = 0, idPost }: AnswerPostProps) => {
  const { data: session, status } = useSession();
  const isUserAuthenTicated = status === "authenticated";

  const uniqueKeyAnswer = `idPost-${idPost}-idParentAnswer-${
    answer.parentAnswerId || "root"
  }`;

  const [isDisplayedWysiwyg, setIsDisplayedWysiwyg] = useState(false);
  const [response, setResponse] = useLocalStorage(
    uniqueKeyAnswer,
    createEmptyField()
  );

  const handlePostAnswer = (e, answer) => {
    console.log("answer posted !");
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
              <p onClick={(e) => handlePostAnswer(e, "ok")}>Poster</p>
            </div>
          </div>
        )}
      </div>
      {Array.isArray(answer.childrenAnswers) &&
        answer.childrenAnswers.map((answer) => {
          return (
            <AnswerPost answer={answer} level={level + 1} idPost={idPost} />
          );
        })}
    </div>
  );
};

export default AnswerPost;
