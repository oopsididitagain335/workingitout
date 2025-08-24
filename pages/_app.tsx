// pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css"; // ← This applies your global reset

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
