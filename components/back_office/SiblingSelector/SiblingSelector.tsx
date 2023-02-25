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
import { PageState } from "../posts/ManageStateContainer/types";
import { PageStateActions } from "../posts/ManageStateContainer/PostManageStateContainer.reducer";

export type NewSibling = {
  isNewSibling: boolean;
};

export type ReactSelectSibling = ReactSelectObject & {
  completeSibling: PageState;
};

type SiblingSelectorProps = {
  languageAvailables: ReactSelectObject[];
  sibling: PageState | NewSibling;
  setHasStateChanged: any;
  isPreloaded: boolean;
  pageState: PageState;
  dispatch: Dispatch<PageStateActions>;
};

const SiblingSelector = ({
  languageAvailables,
  setHasStateChanged,
  isPreloaded = false,
  sibling,
  pageState,
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
    if ("id" in sibling && selectedArticle.value !== sibling.id) {
      setSelectedArticle(computeSelectedArticle(sibling, isPreloaded));
    }
  }, ["id" in sibling && sibling.id]);

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
    const isSiblingAlreadySet = pageState.Sibling.find(
      (sibling: PageState) => sibling.id + "" === siblingObject.value
    );

    if (!isSiblingAlreadySet) {
      // new sibling created from scratch
      if ("isNewSibling" in sibling && sibling.isNewSibling) {
        const indexNullObject = pageState.Sibling.findIndex(
          (currentSibling: NewSibling) => currentSibling.isNewSibling === true
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
          const indexUpdatedObject = pageState.Sibling.findIndex(
            (currentSibling: PageState) =>
              currentSibling.id === selectedArticle.value
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
      for (let i = 0; i < pageState.Sibling.length; i++) {
        const sibling = pageState.Sibling[i];

        if ("id" in sibling && sibling.id && sibling.id === siblingId) {
          indexInPageState = i;
        }
      }
    }
    // deleting newly created sibling
    else {
      for (let i = 0; i < pageState.Sibling.length; i++) {
        const sibling = pageState.Sibling[i];

        if ("isNewSibling" in sibling && sibling.isNewSibling) {
          indexInPageState = i;
        }
      }
    }

    dispatch({ type: "deleteSibling", index: indexInPageState });

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
          handleClick={() => deleteSibling("id" in sibling && sibling.id)}
        />
      </div>
    </div>
  );
};

export default SiblingSelector;
