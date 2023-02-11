"use client";

import style from "./SiblingSelector.module.scss";
import Select from "react-select";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "../../../services/utils";
import { getOnePostbyTitle } from "../../../services/api/post";
import { parseSlateFormatSimple } from "../../../services/react-slate";
import { ReactSelectObject } from "../../../types/types";
import { transformValueToReactSelectValue } from "../../../services/utils";
import SVGButton from "../../generic/Buttons/SVGButton/SVGButtonButton";
import DeleteIcon from "../../../assets/svg/delete_forever/round.svg";

// Refacto step: nom de la prop languageAvailables pas clair car cache le fait que c'est une liste d'objet compatible avec les options de react-select -> typer ?

// TODO : update un sibling deja saisi

const SiblingSelector = ({
  languageAvailables,
  pageState,
  setPageState,
  setHasStateChanged,
  isPreloaded = false,
  sibling,
}) => {
  const computeSelectedArticle = (sibling) => {
    return isPreloaded
      ? transformValueToReactSelectValue(
          sibling.id,
          parseSlateFormatSimple(sibling.title)
        )
      : null;
  };

  const [langSibblingSelected, setLangSibblingSelected] = useState(() => {
    return isPreloaded
      ? transformValueToReactSelectValue(sibling.language, sibling.language)
      : null;
  });
  const [selectedArticle, setSelectedArticle] = useState(() =>
    computeSelectedArticle(sibling)
  );

  // Updating local state after pagestate change
  // Else, if you delete the first one, it is still displayed in componenet (even if it's the right one in pageState)
  useEffect(() => {
    if (selectedArticle.value !== sibling.id) {
      setSelectedArticle(computeSelectedArticle(sibling));
    }
  }, [sibling.id]);

  console.log("selectedArticld", selectedArticle);
  console.log("selectedArticle.id", selectedArticle.id);
  console.log("sibling.id", sibling.id);

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
    const isSiblingAlreadySet = pageState.Sibling.find(
      (sibling) => sibling.id === siblingObject.value
    );

    if (!isSiblingAlreadySet) {
      if (sibling.value === null) {
        const indexNullObject = pageState.Sibling.findIndex(
          (currentSibling) => currentSibling.value === null
        );
        pageState.Sibling[indexNullObject] = {
          value: siblingObject.value,
          title: siblingObject.label,
        };
        setPageState({
          ...pageState,
          Sibling: [...pageState.Sibling],
        });
      } else {
        setPageState({
          ...pageState,
          Sibling: [
            ...pageState.Sibling,
            { value: siblingObject.value, title: siblingObject.label },
          ],
        });
      }
      setSelectedArticle(siblingObject);
      setHasStateChanged(true);
    } else {
      console.error("Sibling already set.");
    }
  };

  const deleteSibling = (siblingId: number) => {
    let indexInPageState;
    const arrayOfSibilingCopy = [...pageState.Sibling];
    for (let i = 0; i < pageState.Sibling.length; i++) {
      const sibling = pageState.Sibling[i];

      if (sibling.id && sibling.id === siblingId) {
        indexInPageState = i;
      } else if (sibling === siblingId) {
        indexInPageState = i;
      }
    }

    arrayOfSibilingCopy.splice(indexInPageState, 1);
    setPageState({
      ...pageState,
      Sibling: arrayOfSibilingCopy,
    });
    setHasStateChanged(true);
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
          handleClick={() => deleteSibling(sibling)}
        />
      </div>
    </div>
  );
};

export default SiblingSelector;
