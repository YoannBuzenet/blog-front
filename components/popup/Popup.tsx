import { FC, useContext } from "react";
import style from "./PopUp.module.scss";
import PopUpsDisplayedContext from "../../contexts/popUpsDisplay";
import CloseMenu from "../../assets/svg/close/outline.svg";

type PopupProps = {
  index: number;
  CompoToRender: FC;
};

const Popup = ({ index, CompoToRender }: PopupProps) => {
  const idPopUp = `popup-${index}`;
  const { popUpsDisplayed, setPopUpsDisplayed } = useContext(
    PopUpsDisplayedContext
  );

  const handleClosePopUp = () => {
    const arrayPopUpCopy = [...popUpsDisplayed];
    arrayPopUpCopy.splice(index, 1);
    setPopUpsDisplayed(arrayPopUpCopy);
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
          {CompoToRender && <CompoToRender />}
        </div>
      </div>
    </div>
  );
};

export default Popup;
