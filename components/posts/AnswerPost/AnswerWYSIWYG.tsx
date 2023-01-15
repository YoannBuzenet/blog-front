"use client";
import { useSession } from "next-auth/react";
import style from "./AnswerWYSIWYG.module.scss";
import { useState } from "react";
import RichText from "../../generic/wysiwyg/RichText";

import { createEmptyField } from "../../generic/wysiwyg/utils";
import { useLocalStorage } from "../../../hooks/hooks";
import { toast } from "react-toastify";
import { AnswerREST } from "../../../secondary/answerREST";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/navigation";
import { AnswerManager } from "../../../domain/answer/AnswerManager";

const AnswerWYSIWYG = ({ idPost, rawAnswer }) => {
  const answer = AnswerManager.fromJSONToDomain(rawAnswer);

  const { data: session, status } = useSession();

  const router = useRouter();

  const isUserAuthenTicated = status === "authenticated" && session.user;

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

    const { user } = session;
    const { googleAccessToken, provider } = user;

    const answerPost = {
      content: stringifiedAnswer,
      UserId: answer.userId,
      PostId: idPost,
      ParentAnswerId: answer.id,
      token: googleAccessToken,
      provider: provider,
    };

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

      // Relaunching data fetching to update answers
      router.refresh();
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
    <>
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
    </>
  );
};

export default AnswerWYSIWYG;
