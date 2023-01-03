import { Providers } from "./providers";
import { headers } from "next/headers";

// On veut que chaque requete axios ajoute ce header
// Voir si on peut mettre ça dans un autre fichier ?
import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    // TODO Mettre un vrai header quand le back filtrera les requetes auth
    console.log("middleware axios log");
    config.headers.Authorization = process.env.PASSPHRASE;
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const acceptLanguageHeader = headersList.get("accept-language");
  const mainHeader = acceptLanguageHeader.split(",")[0];

  return (
    <html lang="en" data-test="test">
      <body>
        <Providers lang={mainHeader}>{children}</Providers>
      </body>
    </html>
  );
}
