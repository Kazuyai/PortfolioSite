import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  // const isTopPage = router.asPath === "/";
  const [isTopPage, setIsTopPage] = useState<boolean | null>(null);

  useEffect(() => {
    setIsTopPage(router.asPath === "/");
    if (router.asPath == "/") window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, []);

  if (isTopPage === null) return null;

  return isTopPage ? (
    <Component {...pageProps} />
  ) : (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;