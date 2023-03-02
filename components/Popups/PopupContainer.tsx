import { FC, useContext } from "react";
import style from "./PopUpContainer.module.scss";
import PopUpsDisplayedContext from "../../contexts/popUpsDisplay";
import CloseMenu from "../../assets/svg/close/outline.svg";

type PopupProps = {
  index: number;
  CompoToRender?: FC;
};

const Popup = ({ index, CompoToRender, ...props }: PopupProps) => {
  const idPopUp = `popup-${index}`;
  const { popUpsDisplayed, setPopUpsDisplayed, removeSpecificPopUp } =
    useContext(PopUpsDisplayedContext);

  const handleClosePopUp = () => {
    removeSpecificPopUp(index);
  };

  return (
    <div className={`${idPopUp} ${style.popUpContainer}`}>
      <style jsx>{`
        .${idPopUp} {
          z-index: ${100 + index};
        }
      `}</style>
      <div>
        <div className={`${style.topPart}`}>
          <div className={`${style.topPart__leftPart}`}></div>
          <div className={`${style.topPart__rightPart}`}>
            <CloseMenu
              className={style.closeSvg}
              title="Fermer"
              onClick={handleClosePopUp}
            />
          </div>
        </div>
        <div className={`${style.mainPart}`}>
          <p>Je suis un pop up</p>
          {CompoToRender && (
            <CompoToRender {...props} handleClosePopUp={handleClosePopUp} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
