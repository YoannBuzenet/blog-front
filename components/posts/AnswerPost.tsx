import style from "../../styles/posts/AnswerPost.module.css";
import DisplayHTML from "../generic/wysiwyg/DisplayHTML";
import genericTextStyle from "../../styles/generic/genericTextStyle.module.css";
import { Answer } from "../../domain/answer/Answer";
import { useState } from "react";
import RichText from "../../components/generic/wysiwyg/RichText";
import { useSession } from "next-auth/react";

type AnswerPostProps = {
  answer: Answer;
  level: number;
};

const AnswerPost = ({ answer, level = 0 }: AnswerPostProps) => {
  const { data: session, status } = useSession();
  const isUserAuthenTicated = status === "authenticated";

  const [isDisplayedWysiwyg, setIsDisplayedWysiwyg] = useState(false);

  const handlePostAnswer = (e, answer) => {
    console.log("answer posted !");
  };

  const temp = [
    {
      type: "paragraph",
      children: [
        {
          text: "Tesla's biggest threat is not external - it is from trying to do too many things.",
        },
      ],
    },
  ];

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
              value={temp}
              setValue={() => {}}
              displayImagePicker={false}
              field="k"
            />
            <div className={style.buttonContainer}>Poster</div>
          </div>
        )}
      </div>
      {Array.isArray(answer.childrenAnswers) &&
        answer.childrenAnswers.map((answer) => {
          return <AnswerPost answer={answer} level={level + 1} />;
        })}
    </div>
  );
};

export default AnswerPost;
