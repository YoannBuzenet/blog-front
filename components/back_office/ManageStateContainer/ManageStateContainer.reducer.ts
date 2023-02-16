import { useReducer } from "react";
import { parseSlateFormatSimple } from "../../../services/react-slate";
import { createURLFromString } from "../../../services/utils";
import { AppUsedLanguage, ReactSelectObject } from "../../../types/types";
import { ReactSelectSibling } from "../SiblingSelector/SiblingSelector";
import { PageState, ReactSlateElement } from "./types";

export type PageStateActions =
  | { type: "addNewSiblingReplaceEmpty"; indexToReplace: number; newSibling }
  | { type: "deleteNewSibling" }
  | { type: "addNewSibling"; sibling: ReactSelectSibling }
  | {
      type: "updateExistingSibling";
      index: number;
      sibling: ReactSelectSibling;
    }
  | { type: "deleteSibling"; index: number }
  | { type: "updateField"; field: string; value: string | boolean }
  | { type: "updateFieldTitle"; value: ReactSlateElement[] }
  | { type: "updateLanguage"; value: ReactSelectObject }
  | { type: "addEmptySibling" }
  | { type: "setCompletePageState"; value: PageState };

export function pageStateReducer(
  pageState: PageState,
  action: PageStateActions
): PageState {
  switch (action.type) {
    case "updateField":
      return {
        ...pageState,
        [action.field]: action.value,
      };
    case "updateFieldTitle":
      const titleAsString = parseSlateFormatSimple(action.value);
      const titleAsURL = createURLFromString(titleAsString);
      return {
        ...pageState,
        title: action.value,
        url: titleAsURL,
      };

    case "updateLanguage":
      return {
        ...pageState,
        language: action.value.value as AppUsedLanguage,
      };

    case "setCompletePageState":
      return {
        ...action.value,
      };

    case "addEmptySibling":
      if (Array.isArray(pageState.Sibling)) {
        return {
          ...pageState,
          Sibling: [...pageState.Sibling, { isNewSibling: true }],
        };
      } else {
        return {
          ...pageState,
          Sibling: [{ isNewSibling: true }],
        };
      }

    case "addNewSibling":
      return {
        ...pageState,
        Sibling: [...pageState.Sibling, action.sibling.completeSibling],
      };

    case "addNewSiblingReplaceEmpty":
      pageState.Sibling[action.indexToReplace] = action.newSibling;

      return {
        ...pageState,
        Sibling: [...pageState.Sibling],
      };

    case "updateExistingSibling":
      pageState.Sibling[action.index] = action.sibling.completeSibling;
      return {
        ...pageState,
        Sibling: [...pageState.Sibling],
      };

    case "deleteSibling":
      const arrayOfSibilingCopy = [...pageState.Sibling];
      arrayOfSibilingCopy.splice(action.index, 1);

      return {
        ...pageState,
        Sibling: [...arrayOfSibilingCopy],
      };
  }
}

export const usePageState = (pageState: PageState) => {
  return useReducer(pageStateReducer, pageState);
};
