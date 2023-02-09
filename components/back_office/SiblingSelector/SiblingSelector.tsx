"use client";

import style from "./SiblingSelector.module.scss";
import Select from "react-select";
import { useCallback, useState } from "react";
import { debounce } from "../../../services/utils";
import { getOnePostbyTitle } from "../../../services/api/post";
import { parseSlateFormatSimple } from "../../../services/react-slate";

// Refacto step: nom de la prop languageAvailables pas clair car cache le fait que c'est une liste d'objet compatible avec les options de react-select -> typer ?

const SiblingSelector = ({ languageAvailables, pageState, setPageState }) => {
  const [langSibblingSelected, setLangSibblingSelected] = useState(null);
  const [articleAvailables, setArticleAvailables] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const languageNotUsed = languageAvailables.filter(
    (language) => language.value !== pageState.language
  );

  const debounceGetPostsByTitle = useCallback(
    debounce((inputValue, currentLang) => {
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
    }, 1000),
    []
  );

  return (
    <div className={style.container}>
      <div className={style.container__leftDiv}>
        <Select
          options={languageNotUsed}
          onChange={(value) => {
            console.log("value", value);
            setLangSibblingSelected(value);
          }}
          value={langSibblingSelected}
        />
      </div>
      <div className={style.container__rightDiv}>
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
        />
      </div>
    </div>
  );
};

export default SiblingSelector;
