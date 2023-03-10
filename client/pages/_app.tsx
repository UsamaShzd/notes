import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress />
      <Header />
      <div className="app-wrapper">
        <Component {...pageProps} />
      </div>
    </>
  );
}
