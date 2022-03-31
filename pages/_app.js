import "../styles/globals.css";
import "../styles/generic/globals.scss";
import config from "../config/axios";
import "../styles/generic/normalize.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
