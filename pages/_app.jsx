import "../styles/globals.css";
import "../styles/generic/globals.scss";
import config from "../config/axios";
import "../styles/generic/normalize.css";
import "../styles/generic/wysiwyg.scss";
import "../styles/generic/globals.scss";
import "../styles/generic/globals.scss";
import "../styles/generic/animations.scss";
import "../styles/generic/wysiwyg.scss";
import "../styles/generic/wysiwygDisplay.css";
import "../styles/generic/colors.scss";
import "../styles/generic/loaders.css";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@mui/material/styles";
import { customMUITheme } from "../styles/Mui/theme";
import { ToastContainer, toast } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import "../styles/generic/normalize.css";
import ImageManagerContainer from "../module/imageManagerContainer";
import "react-image-crop/dist/ReactCrop.css";
import "../module/style/style.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  console.log(
    `Booting app - Back-end API URL is ${process.env.NEXT_PUBLIC_API_URL}`
  );

  return (
    <ImageManagerContainer>
      <ThemeProvider theme={customMUITheme}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <ToastContainer
            position={toast.POSITION.TOP_CENTER}
            autoClose={10000}
          />
        </SessionProvider>
      </ThemeProvider>
    </ImageManagerContainer>
  );
}

export default MyApp;
