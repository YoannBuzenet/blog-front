import React from "react";

export default React.createContext({
  wysiwygContext: { urlYoutube: "" },
  setWysiwygContext: (value) => {},
  resetUrlYoutube: () => {},
});
