import Head from 'next/head'
import Layout from "../components//layout"
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <>
    <Head>
      <title>Game-catalog-next</title>
    </Head>
    <Layout>
      <h1>Welcome to my game catalog</h1>
    <footer className={styles.footer}></footer>
    </Layout>
  </>
);
}
