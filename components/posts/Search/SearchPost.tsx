"use client";

import { useContext, useEffect, useState } from "react";
import AppLangContext from "../../../contexts/appCurrentLang";
import { Tag } from "../../../domain/tag/Tag";
import { getAllPostTags } from "../../../services/api/tag";
import GenericButton from "../../generic/Buttons/GenericButton/GenericButton";
import MultipleSelectChip from "../../generic/MultiSelect/MultiSelectTags";

const SearchPost = ({ initialTags, localeBrowser }) => {
  const { appCurrentLang } = useContext(AppLangContext);
  const [tagsAppLanguage, setTagsAppLanguage] = useState(initialTags);

  useEffect(() => {
    if (!appCurrentLang.isDefault && appCurrentLang.locale !== localeBrowser) {
      console.log("Updating tag language");
      getAllPostTags(appCurrentLang.locale).then((resp) => {
        setTagsAppLanguage(resp);
        setSelectedTags([]);
      });
    }
  }, [appCurrentLang.locale]);

  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  return (
    <div className="largePageContainer belowNavbar">
      <p>Search Post</p>
      <MultipleSelectChip
        totalListElements={tagsAppLanguage}
        selectedElements={selectedTags}
        setSelectedElements={setSelectedTags}
      />

      {/* Bouton Rechercher
      Lister les posts reçus */}
      <GenericButton
        handleClick={() => console.log("clické")}
        text="Rechercher"
      />
    </div>
  );
};

export default SearchPost;
