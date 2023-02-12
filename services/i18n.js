const { LANGUAGE_SETTINGS_LOCAL_STORAGE } = require("../i18n/consts");

const checkLangLocaleStorage = (langInApp, lang) => {

  let appInitialLang;
  let langSavedInLocalStorage;
  if (typeof window !== "undefined") {
    langSavedInLocalStorage = window.localStorage.getItem(
      LANGUAGE_SETTINGS_LOCAL_STORAGE
    );
  }

  if (langSavedInLocalStorage) {
    if (langInApp?.[langSavedInLocalStorage] !== undefined) {
      appInitialLang = langInApp[langSavedInLocalStorage];
    } else {
      appInitialLang = langInApp[lang];
      appInitialLang.isDefault = true;
    }
  } else {
    appInitialLang = langInApp[lang];
    appInitialLang.isDefault = true;
  }

  return appInitialLang;
};

module.exports = { checkLangLocaleStorage };
