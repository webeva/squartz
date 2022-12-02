/* Special page is Next.js called _document. Can be used to
change some fundamental things */

//Import all the components of a Nextjs website
import { Html, Head, Main, NextScript } from "next/document";

//Export the document 
export default function Document() {
  //Return the JSX
  return (
    <Html
      lang="en"
      dir="ltr">
        <link rel="shortcut icon" href="/assets/favicon.png" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YFMKYBDJBC"></script>
        <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YFMKYBDJBC', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
      <Head />
      <body
        style={{
          backgroundColor: "var(--third-background-color)",
          overflowX: "hidden",
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
//End of the _document page