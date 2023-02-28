"use client";

import { useContext } from "react";
import AppLangContext from "../../../contexts/appCurrentLang";

const SearchPost = ({ initialTags }) => {
  const { appCurrentLang } = useContext(AppLangContext);

  // TODO Chercher les tags depuis la langue du contexte et feed le multi select

  return (
    <div className="largePageContainer belowNavbar">
      <p>Search Post</p>
    </div>
  );
};

export default SearchPost;
