"use client";

import style from "./SiblingSelector.module.scss";
import Select from "react-select";
import { Dispatch, useCallback, useEffect, useState } from "react";
import { debounce, JSONParseAllProps } from "../../../services/utils";
import { getOnePostbyTitle } from "../../../services/api/post";
import { parseSlateFormatSimple } from "../../../services/react-slate";
import { ReactSelectObject } from "../../../types/types";
import SVGButton from "../../generic/Buttons/SVGButton/SVGButtonButton";
import DeleteIcon from "../../../assets/svg/delete_forever/round.svg";
import {
  computeSelectedArticle,
  computeSelectedLang,
} from "./SibilingSelector.func";
import { PageState } from "../ManageStateContainer/types";
import { PageStateActions } from "../ManageStateContainer/ManageStateContainer.reducer";

// Second temps :
// revoir nom de la prop languageAvailables pas clair car omet le fait que c'est une liste d'objet compatible avec les options de react-select -> typer ?

export type NewSibling = {
  isNewSibling: boolean;
};

export type ReactSelectSibling = ReactSelectObject & { completeSibling: any };

type SiblingSelectorProps = {
  languageAvailables: any;
  pageState: PageState;
  pageState2: PageState;
  dispatch: Dispatch<PageStateActions>;
  sibling: PageState & NewSibling;
  setPageState: any;
  setHasStateChanged: any;
  isPreloaded: boolean;
};

const SiblingSelector = ({
  languageAvailables,
  pageState,
  setPageState,
  setHasStateChanged,
  isPreloaded = false,
  sibling,
  pageState2,
  dispatch,
}: SiblingSelectorProps) => {
  const [langSibblingSelected, setLangSibblingSelected] = useState(() =>
    computeSelectedLang(sibling, isPreloaded)
  );
  const [selectedArticle, setSelectedArticle] = useState(() =>
    computeSelectedArticle(sibling, isPreloaded)
  );

  // Updating local state after pagestate change
  // Else, if you delete the first one, it is still displayed in componenet (even if it's the right one in pageState)
  useEffect(() => {
    if (selectedArticle.value !== sibling.id) {
      setSelectedArticle(computeSelectedArticle(sibling, isPreloaded));
    }
  }, [sibling.id]);

  const [articleAvailables, setArticleAvailables] = useState([]);

  const [inputSearch, setInputSearch] = useState("");

  const languageNotUsed = languageAvailables.filter(
    (language) => language.value !== pageState2.language
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
                completeSibling: JSONParseAllProps(article),
              }))
            )
        );
      },
      1000
    ),
    []
  );

  const addSibling = (siblingObject: ReactSelectSibling) => {
    const isSiblingAlreadySet = pageState2.Sibling.find(
      (sibling) => sibling.id + "" === siblingObject.value
    );

    if (!isSiblingAlreadySet) {
      // new sibling created from scratch
      if (sibling.isNewSibling) {
        const indexNullObject = pageState2.Sibling.findIndex(
          (currentSibling) => currentSibling.isNewSibling === true
        );
        dispatch({
          type: "addNewSiblingReplaceEmpty",
          indexToReplace: indexNullObject,
          newSibling: sibling,
        });
      } else {
        if (!selectedArticle) {
          // first value into the select
          dispatch({ type: "addNewSibling", sibling: siblingObject });
        } else {
          // update
          const indexUpdatedObject = pageState2.Sibling.findIndex(
            (currentSibling) => currentSibling.id === selectedArticle.value
          );
          dispatch({
            type: "updateExistingSibling",
            index: indexUpdatedObject,
            sibling: siblingObject,
          });
        }
      }
      setSelectedArticle(siblingObject);
      setHasStateChanged(true);
    } else {
      console.error("Sibling already set.");
    }
  };

  const deleteSibling = (siblingId: number) => {
    let indexInPageState: number;

    // deleting existing sibling
    if (siblingId) {
      for (let i = 0; i < pageState2.Sibling.length; i++) {
        const sibling = pageState2.Sibling[i];

        if (sibling.id && sibling.id === siblingId) {
          indexInPageState = i;
        }
      }
    }
    // deleting newly created sibling
    else {
      for (let i = 0; i < pageState2.Sibling.length; i++) {
        const sibling = pageState2.Sibling[i];

        if (sibling.isNewSibling) {
          indexInPageState = i;
        }
      }
    }

    dispatch({ type: "delete", index: indexInPageState });

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
          handleClick={() => deleteSibling(sibling.id)}
        />
      </div>
    </div>
  );
};

export default SiblingSelector;
