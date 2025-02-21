import Head from "next/head";
import dynamic from "next/dynamic";

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
    </>
  );
};

export default Home;
