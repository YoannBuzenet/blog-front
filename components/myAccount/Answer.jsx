import style from "../../styles/pages/myAccount/Answer.module.css";

const Answer = ({ content }) => {
  console.log("content reçu", content);
  // answer in content.content

  return (
    <div className={style.container}>
      <p>Answer</p>
    </div>
  );
};

export default Answer;
