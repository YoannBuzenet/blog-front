import { useSession } from "next-auth/react";
import Answer from "./Answer";
import style from "../../styles/pages/myAccount/MyAnswers.module.css";

const MyAnswers = () => {
  const { data, status } = useSession();

  console.log("data", data);
  console.log("status", status);

  return (
    <div className={style.container}>
      <h1 className={`h2`}>My Answers</h1>
      {Array.isArray(data?.user?.Answers) &&
        data.user.Answers.map((answer, index) => (
          <Answer content={answer} key={index} />
        ))}
    </div>
  );
};

export default MyAnswers;
