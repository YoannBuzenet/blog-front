import style from "../../../styles/posts/AnswerPost.module.css";
import DisplayHTML from "../../generic/wysiwyg/DisplayHTML";
import genericTextStyle from "../../../styles/generic/genericTextStyle.module.css";

import AnswerWYSIWYG from "./AnswerWYSIWYG";

type AnswerPostProps = {
  rawAnswer: Record<string, any>; //TODO add real type, or see if we can use classes for the prop usage in this component and still pass the raw answer to the child (class not accepted)
  level: number;
  idPost: number;
};

const AnswerPost = ({ rawAnswer, level = 0, idPost }: AnswerPostProps) => {
  return (
    <div className={`${style.rootAnswer}`}>
      <div
        className={`${style.container} ${genericTextStyle.content}`}
        style={{ marginLeft: `${level * 3}rem` }}
      >
        <div className={style.splitter}>
          <div className={style.user}>{rawAnswer?.User?.nickname}</div>
          <div className={style.answerWysiwyg}>
            <DisplayHTML slateText={rawAnswer.content} />
          </div>
        </div>
        <AnswerWYSIWYG idPost={idPost} rawAnswer={rawAnswer} />
      </div>
      {Array.isArray(rawAnswer.childrenAnswers) &&
        rawAnswer.childrenAnswers.map((answer) => {
          return (
            <AnswerPost rawAnswer={answer} level={level + 1} idPost={idPost} />
          );
        })}
    </div>
  );
};

export default AnswerPost;
