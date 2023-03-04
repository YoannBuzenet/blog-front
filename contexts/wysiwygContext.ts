import React from "react";

export default React.createContext({
  wysiwygContext: { urlYoutube: "", currentTweet: "" },
  setWysiwygContext: (value) => {},
  resetUrlYoutube: () => {},
  resetCurrentTweet: () => {},
});
