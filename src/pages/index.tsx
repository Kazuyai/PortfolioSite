import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "@/styles/Home.module.scss";

const R3FCanvas = dynamic(() => import("@/components/R3FCanvas"), { ssr: false });

const Home = () => {
  return (
    <>
      <Head>
        <title>My Portfolio</title>
        <meta name="description" content="3D Model Showcase" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <R3FCanvas />
      <div className={styles.text__container}>
        <section className={styles.section + " " + styles.section__top}>
          <h1>Hello!</h1>
          <p>Welcome to my portfolio!</p>
        </section>
        <section className={styles.section + " " + styles.section__skills}>
          <h1>Hello!</h1>
          <p>Welcome to my portfolio!</p>
        </section>
      </div>
    </>
  );
};

export default Home;
