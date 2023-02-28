"use client";

import { useContext } from "react";
import AppLangContext from "../../../contexts/appCurrentLang";

const SearchPost = () => {
  const { appCurrentLang } = useContext(AppLangContext);

  // TODO Chercher les tags depuis la langue du contexte et feed le multi select

  // Gets all tags
  // Multi select
  // CTA Rechercher

  return (
    <div className="largePageContainer belowNavbar">
      <p>Search Post</p>
    </div>
  );
};

export default SearchPost;
