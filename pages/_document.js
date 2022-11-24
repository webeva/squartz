import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body style={{backgroundColor:"var(--third-background-color)"}}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}