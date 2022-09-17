import { useIntl } from "react-intl";

const useTranslation = () => {
  const Intl = useIntl();

  return {
    t: (idTranslation, defaultString) =>
      Intl.formatMessage({
        id: idTranslation,
        defaultMessage: defaultString,
      }),
  };
};

module.exports = { useTranslation };
