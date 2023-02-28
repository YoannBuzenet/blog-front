"use client";

import { useContext, useEffect, useState } from "react";
import AppLangContext from "../../../contexts/appCurrentLang";
import { getAllPostTags } from "../../../services/api/tag";

const SearchPost = ({ initialTags, localeBrowser }) => {
  const { appCurrentLang } = useContext(AppLangContext);
  const [tagsAppLanguage, setTagsAppLanguage] = useState(initialTags);

  useEffect(() => {
    if (!appCurrentLang.isDefault && appCurrentLang.locale !== localeBrowser) {
      console.log("Updating tag language");
      getAllPostTags(appCurrentLang.locale).then((resp) =>
        setTagsAppLanguage(resp)
      );
    }
  }, []);

  // TODO Chercher les tags depuis la langue du contexte et feed le multi select

  return (
    <div className="largePageContainer belowNavbar">
      <p>Search Post</p>
    </div>
  );
};

export default SearchPost;
