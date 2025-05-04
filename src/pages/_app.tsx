import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  // const isTopPage = router.asPath === "/";
  const [isTopPage, setIsTopPage] = useState<boolean | null>(null);

  useEffect(() => {
    setIsTopPage(router.pathname === "/");
    if (router.pathname == "/") window.scrollTo(0, 0);
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, []);

  useEffect(() => {
    setIsTopPage(router.pathname === "/");
  }, [router.pathname]);

  if (isTopPage === null) return null;

  return (
    <AnimatePresence mode="wait">
      { isTopPage ? (
        <motion.div key={`page-${router.pathname}`}>
          <Component {...pageProps} />
          <motion.div
            key={`overlay-${router.pathname}`}
            className="irisOverlay"
            initial={{ "--r": "110vw" }}
            animate={{ "--r": "110vw" }}
            exit={{ "--r": "0vw" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </AnimatePresence>
  );
}

export default App;