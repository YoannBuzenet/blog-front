const initializeLang = (langInApp) => {
  let appInitialLang;
  let langSavedInLocalStorage;
  if (typeof window !== "undefined") {
    langSavedInLocalStorage = window.localStorage.getItem("lang");
  }

  if (langSavedInLocalStorage) {
    if (langInApp?.[langSavedInLocalStorage] !== undefined) {
      appInitialLang = langInApp[langSavedInLocalStorage];
    } else {
      appInitialLang = langInApp["en-US"];
      appInitialLang.isDefault = true;
    }
  } else {
    appInitialLang = langInApp["en-US"];
    appInitialLang.isDefault = true;
  }

  return appInitialLang;
};

module.exports = { initializeLang };
