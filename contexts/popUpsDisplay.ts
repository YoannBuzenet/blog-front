import React, { FC } from "react";

export type PopUp = {
  CompoToRender?: FC;
};

export default React.createContext({
  popUpsDisplayed: [],
  setPopUpsDisplayed: (value) => {},
  addPopUp: (value) => {},
  removeSpecificPopUp: (value) => {},
});
