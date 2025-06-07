import "@/styles/globals.scss";
import "@/styles/Home.module.scss";
import "@/styles/sections/About.module.scss";
import "@/styles/sections/Gallery.module.scss";
import "@/styles/sections/Skills.module.scss";
import "@/styles/sections/Projects.module.scss";
import "@/styles/sections/Top.module.scss";
import "@/styles/pages/404.module.scss";
import "@/styles/pages/projects.module.scss";
import "@/styles/pages/gallery.module.scss";
import "@/styles/Header.module.scss";
import "@/styles/Footer.module.scss";
import "@/styles/common/WIP.module.scss";

import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import ToTopButton from "@/components/common/ToTopButton";
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
        <motion.div key={`page-${router.pathname}`} className="page">
          <Layout>
            <Component {...pageProps} />
            <ToTopButton />
          </Layout>
          <motion.div
            key={`panel-top-${router.pathname}`}
            className="panel top"
            initial={{ "--pos": "0%" }}
            animate={{ "--pos": "-100%" }}
            exit={{ "--pos": "-100%" }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
          />
          <motion.div
            key={`panel-bottom-${router.pathname}`}
            className="panel bottom"
            initial={{ "--pos": "0%" }}
            animate={{ "--pos": "-100%" }}
            exit={{ "--pos": "-100%" }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;