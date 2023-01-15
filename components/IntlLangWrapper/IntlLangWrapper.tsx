"use client";

import { FormattedMessage } from "react-intl";

const IntlLangWrapper = ({ translationKey, defaultMessage }) => {
  return (
    <FormattedMessage id={translationKey} defaultMessage={defaultMessage} />
  );
};

export default IntlLangWrapper;
