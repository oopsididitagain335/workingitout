import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#000",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
