"use client";

import { useContext, useEffect, useState } from "react";
import AppLangContext from "../../../contexts/appCurrentLang";
import { getAllPostTags } from "../../../services/api/tag";
import MultipleSelectChip from "../../generic/MultiSelect/MultiSelect";

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

  const [personName, setPersonName] = useState<string[]>([]);

  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  return (
    <div className="largePageContainer belowNavbar">
      <p>Search Post</p>
      <MultipleSelectChip
        initialListElements={names}
        selectedElements={personName}
        setSelectedElements={setPersonName}
      />
    </div>
  );
};

export default SearchPost;
