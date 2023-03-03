"use client";
import InputField from "../../generic/InputField/InputField";
import style from "./PopUpAddYoutubeURL.module.scss";
import WysiwygContext from "../../../contexts/wysiwygContext";
import { useContext } from "react";
import GenericButton from "../../generic/Buttons/GenericButton/GenericButton";
import { parseYoutubeUrl } from "../../generic/wysiwyg/YoutubeEmbed/YoutubeEmbed.func";

const PopUpAddYoutubeURL = ({ ...props }) => {
  const { wysiwygContext, setWysiwygContext, resetUrlYoutube } =
    useContext(WysiwygContext);

  const { insertVideo, handleClosePopUp } = props;

  const handleChange = (e) => {
    setWysiwygContext({ ...wysiwygContext, urlYoutube: e.target.value });
  };

  return (
    <div className={style.container}>
      <p>Youtube URL</p>
      <InputField
        handleChange={handleChange}
        value={wysiwygContext.urlYoutube}
        id="YoutubePopUp"
        propToAffect="None"
        label="Youtube URL"
        fullWidth
      />
      <div className={style.buttonContainer}>
        <div className={style.buttonContainer__CancelButton}>
          <GenericButton
            handleClick={() => {
              resetUrlYoutube();
              handleClosePopUp();
            }}
            text="Cancel"
          />
        </div>
        <div className={style.buttonContainer__ValidateButton}>
          <GenericButton
            handleClick={() => {
              insertVideo(parseYoutubeUrl(wysiwygContext.urlYoutube));
              handleClosePopUp();
              resetUrlYoutube();
            }}
            text="Valider"
            isDisabled={wysiwygContext.urlYoutube.length === 0}
          />
        </div>
      </div>
    </div>
  );
};

export default PopUpAddYoutubeURL;
