import { useIntl } from "react-intl";

export const useTranslation = () => {
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
