"use client";
import InputField from "../../generic/InputField/InputField";
import style from "./PopUpAddTweet.module.scss";
import WysiwygContext from "../../../contexts/wysiwygContext";
import { useContext } from "react";
import GenericButton from "../../generic/Buttons/GenericButton/GenericButton";
import { wrapSnippetIntoQuotes } from "../../generic/wysiwyg/Twitter/Twitter.func";

const PopUpAddTweet = ({ ...props }) => {
  const { wysiwygContext, setWysiwygContext, resetCurrentTweet } =
    useContext(WysiwygContext);

  const { insertTweet, handleClosePopUp } = props;

  const handleChange = (e) => {
    setWysiwygContext({ ...wysiwygContext, currentTweet: e.target.value });
  };

  return (
    <div className={style.container}>
      <p>Tweet Snippet</p>
      <InputField
        handleChange={handleChange}
        value={wysiwygContext.currentTweet}
        id="TweetPopUp"
        propToAffect="None"
        label="Tweet snippet"
        fullWidth
      />
      <div className={style.buttonContainer}>
        <div className={style.buttonContainer__CancelButton}>
          <GenericButton
            handleClick={() => {
              resetCurrentTweet();
              handleClosePopUp();
            }}
            text="Cancel"
          />
        </div>
        <div className={style.buttonContainer__ValidateButton}>
          <GenericButton
            handleClick={() => {
              insertTweet(wysiwygContext.currentTweet);
              handleClosePopUp();
              resetCurrentTweet();
            }}
            text="Valider"
            isDisabled={wysiwygContext.currentTweet.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default PopUpAddTweet;
