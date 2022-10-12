import style from "../../styles/pages/myAccount/Answer.module.css";
import DisplayHTML from "../generic/wysiwyg/DisplayHTML";
import genericTextStyle from "../../styles/generic/genericTextStyle.module.css";
import Link from "next/link";

const Answer = ({ content }) => {
  console.log("content reçu", content);
  // answer in content.content

  let contentParsed;
  try {
    contentParsed = JSON.parse(content.content);
  } catch (e) {
    console.log("Couldn't parse the answer.");
  }

  return (
    <div className={style.container}>
      <div>
        <div className={`${genericTextStyle.content} ${style.answerContent}`}>
          <DisplayHTML slateText={contentParsed} />
        </div>
        <div className={`${style.link} generalLink`}>
          <Link href={`/posts/${content.PostId}`}>See the article</Link>
        </div>
      </div>
    </div>
  );
};

export default Answer;
