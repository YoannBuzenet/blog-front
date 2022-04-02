import { useRef, useEffect } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

function usePreventUserFromErasingContent(hasStateChanged) {
  useEffect(() => {
    if (hasStateChanged) {
      // Adding window alert if the shop quits without saving
      window.onbeforeunload = function () {
        return "Souhaitez-vous sauvegarder avant de quitter la page ?";
      };
    }
  }, [hasStateChanged]);
}

module.exports = { usePrevious, usePreventUserFromErasingContent };
