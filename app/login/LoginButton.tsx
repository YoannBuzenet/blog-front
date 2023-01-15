"use client";
import IntlLangWrapper from "../../components/IntlLangWrapper/IntlLangWrapper";
import { useSession, signIn } from "next-auth/react";
import GoogleIcon from "../../assets/icons/google.svg";
import { useTranslation } from "../../i18n/hooks";

const LoginButton = () => {
  const handleGoogleClick = async (e) => {
    e.preventDefault();
    signIn("google", {
      callbackUrl: `/`,
    });
  };

  const { t } = useTranslation();

  return (
    <button onClick={handleGoogleClick} className="CTAButton">
      <div>
        <GoogleIcon
          title={t("generic.connect.google", "Connect With Google")}
        />
        <p>
          <IntlLangWrapper
            translationKey={"page.login.button.login"}
            defaultMessage="Login / Register"
          />
        </p>
      </div>
    </button>
  );
};

export default LoginButton;
