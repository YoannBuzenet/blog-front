import { useReducer } from "react";
import { ReactSelectSibling } from "../SiblingSelector/SiblingSelector";
import { PageState } from "./types";

export type PageStateActions = {type : "addNewSiblingReplaceEmpty"; indexToReplace : number, newSibling} 
                                | {type : "deleteNewSibling"} 
                                | {type : "addNewSibling", sibling : ReactSelectSibling} 
                                | {type : "updateExistingSibling", index : number, sibling : ReactSelectSibling}
                                | {type : "delete", index : number}



export function pageStateReducer(pageState: PageState, action: PageStateActions): PageState {

  switch (action.type) {

    case 'addNewSiblingReplaceEmpty':
        pageState.Sibling[action.indexToReplace] = action.newSibling;
        
      return {
        ...pageState,
        Sibling: [...pageState.Sibling],
      }; 

    case 'addNewSibling':
      return {
        ...pageState,
        Sibling: [...pageState.Sibling, action.sibling.completeSibling],
      }; 

      case 'updateExistingSibling':
        pageState.Sibling[action.index] = action.sibling.completeSibling;
      return {
        ...pageState,
        Sibling: [...pageState.Sibling],
      };

      case 'delete':

      const arrayOfSibilingCopy = [...pageState.Sibling];
      arrayOfSibilingCopy.splice(action.index, 1);

      return {
        ...pageState,
        Sibling: [...arrayOfSibilingCopy],
      };
  }
}

export const usePageState = (pageState) => {
    return useReducer(pageStateReducer, pageState);
}