"use client";

import style from "./SiblingSelector.module.scss";
import Select from "react-select";
import { useCallback, useState } from "react";
import { debounce } from "../../../services/utils";

// Refacto step: nom de la prop languageAvailables pas clair car cache le fait que c'est une liste d'objet compatible avec les options de react-select -> typer ?

const SiblingSelector = ({ languageAvailables, pageState }) => {
  const [langSibblingSelected, setLangSibblingSelected] = useState(null);
  const [articleAvailables, setArticleAvailables] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const languageNotUsed = languageAvailables.filter(
    (language) => language.value !== pageState.language
  );
  console.log(languageNotUsed, "languageNotUsed");

  const debounceK = useCallback(
    debounce((e) => console.log("on log bordel", e), 1000),
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
          options={[]}
          isSearchable
          onInputChange={(e) => {
            setInputSearch(e);
            debounceK(e);
          }}
          inputValue={inputSearch}
        />
      </div>
    </div>
  );
};

export default SiblingSelector;
