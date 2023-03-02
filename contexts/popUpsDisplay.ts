import React, { ReactElement } from "react";

export type PopUp = {
  index: number;
  CompoToRender: ReactElement;
};

export default React.createContext({
  popUpsDisplayed: [],
  setPopUpsDisplayed: (value) => {},
});
