import { Providers } from "./providers";
import { headers } from "next/headers";
import ResponsiveMenuContainer from "../components/Menu/ResponsiveMenu/ResponsiveMenuContainer";

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
        <ResponsiveMenuContainer />

        <Providers langHeaders={mainHeader}>{children}</Providers>
      </body>
    </html>
  );
}
