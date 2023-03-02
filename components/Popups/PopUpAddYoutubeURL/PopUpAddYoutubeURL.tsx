"use client";
import InputField from "../../generic/InputField/InputField";
import style from "./PopUpAddYoutubeURL.module.scss";
import WysiwygContext from "../../../contexts/wysiwygContext";
import { useContext } from "react";

const PopUpAddYoutubeURL = ({ ...props }) => {
  const { wysiwygContext, setWysiwygContext, resetUrlYoutube } =
    useContext(WysiwygContext);

  console.log("props", props);

  const handleChange = (e) => {
    console.log("e.target.value", e.target.value);
    setWysiwygContext({ ...wysiwygContext, urlYoutube: e.target.value });
  };

  return (
    <div className={style.container}>
      <InputField
        handleChange={handleChange}
        value={wysiwygContext.urlYoutube}
        id="YoutubePopUp"
        propToAffect="None"
      />
      <button
        onClick={() => {
          resetUrlYoutube();
          props.handleClosePopUp();
        }}
      >
        Annuler
      </button>
      <button
        onClick={() => {
          props.test(wysiwygContext.urlYoutube);
          props.handleClosePopUp();
          resetUrlYoutube();
        }}
        disabled={wysiwygContext.urlYoutube.length === 0}
      >
        test
      </button>
      OK OK
    </div>
  );
};

export default PopUpAddYoutubeURL;
