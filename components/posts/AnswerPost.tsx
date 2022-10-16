import style from "../../styles/posts/AnswerPost.module.css";
import DisplayHTML from "../generic/wysiwyg/DisplayHTML";
import genericTextStyle from "../../styles/generic/genericTextStyle.module.css";
import { Answer } from "../../domain/answer/Answer";

type AnswerPostProps = {
  answer: Answer;
  level: number;
};

const AnswerPost = ({ answer, level = 0 }: AnswerPostProps) => {
  console.log("answer", answer);
  console.log("mon level", level);

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
            <p>Reply</p>
          </div>
        </div>
      </div>
      {Array.isArray(answer.childrenAnswers) &&
        answer.childrenAnswers.map((answer) => {
          return <AnswerPost answer={answer} level={level + 1} />;
        })}
    </div>
  );
};

export default AnswerPost;
