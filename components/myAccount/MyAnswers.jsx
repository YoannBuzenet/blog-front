import { useSession } from "next-auth/react";
import Answer from "./Answer";

const MyAnswers = () => {
  const { data, status } = useSession();

  console.log("data", data);
  console.log("status", status);

  return (
    <div>
      <p>My Answers</p>
      {Array.isArray(data?.user?.Answers) &&
        data.user.Answers.map((answer, index) => (
          <Answer content={answer} key={index} />
        ))}
    </div>
  );
};

export default MyAnswers;
