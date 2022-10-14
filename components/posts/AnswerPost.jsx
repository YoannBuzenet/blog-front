import style from "../../styles/posts/AnswerPost.module.css";
import DisplayHTML from "../generic/wysiwyg/DisplayHTML";
import genericTextStyle from "../../styles/generic/genericTextStyle.module.css";

const AnswerPost = ({ answer }) => {
  console.log("answer", answer);

  return (
    <div className={`${style.container} ${genericTextStyle.content}`}>
      <div className={style.splitter}>
        <div className={style.user}>{answer?.User?.nickname}</div>
        <div className={style.answerWysiwyg}>
          <DisplayHTML slateText={answer.content} />
        </div>
      </div>
    </div>
  );
};

export default AnswerPost;
