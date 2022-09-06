import English from "translations/en-US.json";
import French from "translations/fr-FR.json";

const langInApp = {
  "en-US": {
    translatedText: English,
    picture: "EN",
    langID: 0,
    locale: "en-US",
  },
  "fr-FR": {
    translatedText: French,
    picture: "FR",
    langID: 1,
    locale: "fr-FR",
  },
};

const arrayLangsInApp = [
  {
    translatedText: English,
    picture: "EN",
    langID: 0,
    locale: "en-US",
  },
  {
    translatedText: French,
    picture: "FR",
    langID: 1,
    locale: "fr-FR",
  },
];

const expandLocaleDictionnary = {
  fr: "fr-FR",
  en: "en-US",
};

module.exports = { langInApp, arrayLangsInApp, expandLocaleDictionnary };
