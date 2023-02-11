"use client";

import style from "./SiblingSelector.module.scss";
import Select from "react-select";
import { useCallback, useState } from "react";
import { debounce } from "../../../services/utils";
import { getOnePostbyTitle } from "../../../services/api/post";
import { parseSlateFormatSimple } from "../../../services/react-slate";
import { ReactSelectObject } from "../../../types/types";
import { transformValueToReactSelectValue } from "../../../services/utils";
import SVGButton from "../../generic/Buttons/SVGButton/SVGButtonButton";
import DeleteIcon from "../../../assets/svg/delete_forever/round.svg";

// Refacto step: nom de la prop languageAvailables pas clair car cache le fait que c'est une liste d'objet compatible avec les options de react-select -> typer ?

// Quid du bouton Delete ? On fait un bouton spécifique ?

const SiblingSelector = ({
  languageAvailables,
  pageState,
  setPageState,
  setHasStateChanged,
  isPreloaded = false,
  sibling,
  index,
}) => {
  const [langSibblingSelected, setLangSibblingSelected] = useState(() => {
    return isPreloaded
      ? transformValueToReactSelectValue(sibling.language, sibling.language)
      : null;
  });
  const [selectedArticle, setSelectedArticle] = useState(() => {
    return isPreloaded
      ? transformValueToReactSelectValue(
          sibling.id,
          parseSlateFormatSimple(sibling.title)
        )
      : null;
  });

  const [articleAvailables, setArticleAvailables] = useState([]);

  const [inputSearch, setInputSearch] = useState("");

  const languageNotUsed = languageAvailables.filter(
    (language) => language.value !== pageState.language
  );

  const debounceGetPostsByTitle = useCallback(
    debounce(
      (inputValue: string, currentLang: ReactSelectObject): Promise<void> => {
        const currentLangValue = currentLang.value;
        return getOnePostbyTitle(inputValue, true, currentLangValue).then(
          (resp) =>
            setArticleAvailables(
              resp.map((article) => ({
                value: article.id,
                label: parseSlateFormatSimple(JSON.parse(article.title)),
              }))
            )
        );
      },
      1000
    ),
    []
  );

  const addSibling = (siblingObject: ReactSelectObject) => {
    const isSibilingAlreadySet = pageState.Sibling.find(
      (sibling) => sibling.id === siblingObject.value
    );

    if (!isSibilingAlreadySet) {
      setPageState({
        ...pageState,
        Sibling: [...pageState.Sibling, siblingObject.value],
      });
      setSelectedArticle(siblingObject);
      setHasStateChanged(true);
    } else {
      console.error("Sibling already set.");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.container__leftDiv}>
        <Select
          options={languageNotUsed}
          onChange={(value) => {
            setLangSibblingSelected(value);
          }}
          value={langSibblingSelected}
        />
      </div>
      <div className={style.container__centralDiv}>
        <Select
          options={articleAvailables}
          isSearchable
          onInputChange={(value) => {
            setInputSearch(value);
            if (value && value.length > 0) {
              debounceGetPostsByTitle(value, langSibblingSelected);
            }
          }}
          inputValue={inputSearch}
          onChange={addSibling}
          isDisabled={!langSibblingSelected}
          value={selectedArticle}
        />
      </div>
      <div className={style.container__rightDiv}>
        <SVGButton
          Svg={DeleteIcon}
          svgTitle="Delete Sibling"
          handleClick={() => console.log("deleting sibling !")}
        />
      </div>
    </div>
  );
};

export default SiblingSelector;
