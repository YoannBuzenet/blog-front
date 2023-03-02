import { FC, ReactElement } from "react";
import style from "./PopUp.module.scss";

type PopupProps = {
  index: number;
  CompoToRender: FC;
};

const Popup = ({ index, CompoToRender }: PopupProps) => {
  const idPopUp = `popup-${index}`;

  return (
    <div className={`${idPopUp} ${style.popUpContainer}`}>
      <style jsx>{`
        .${idPopUp} {
          z-index: ${100 + index};
        }
      `}</style>
      <p>Je suis un pop up</p>
      {CompoToRender && <CompoToRender />}
    </div>
  );
};

export default Popup;
