import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <meta charSet='utf-8' />
      </Head>
      <body className="m-0 p-0 min-h-screen w-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
