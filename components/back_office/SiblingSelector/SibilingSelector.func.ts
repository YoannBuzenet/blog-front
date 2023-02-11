import { parseSlateFormatSimple } from "../../../services/react-slate";
import { transformValueToReactSelectValue } from "../../../services/utils";

export const computeSelectedArticle = (sibling, isPreloaded: boolean) => {
    return isPreloaded
      ? transformValueToReactSelectValue(
          sibling.id,
          parseSlateFormatSimple(sibling.title)
        )
      : null;
  };