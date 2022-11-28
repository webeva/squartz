/* Special page is Next.js called _document. Can be used to
change some fundamental things */

//Import all the components of a Nextjs website
import { Html, Head, Main, NextScript } from "next/document";

//Export the document 
export default function Document() {
  //Return the JSX
  return (
    <Html>
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