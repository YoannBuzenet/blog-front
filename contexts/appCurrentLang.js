import React from "react";

export default React.createContext({
  appCurrentLang: {
    locale: "",
    translatedText: "",
  },
  setAppCurrentLang: (value) => {},
});
