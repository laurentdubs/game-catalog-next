import Head from 'next/head'
import Layout from "../components//layout"
import styles from '../styles/Home.module.css'
import { useUser } from '@auth0/nextjs-auth0';



export default function Home() {
  const { user, isLoading, error } = useUser();
  
  return (
    <>
    <Head>
      <title>Game-catalog-next</title>
    </Head>
    <Layout>
      <h1>Welcome to my game catalog</h1>
      <div className={styles.container}>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div>
          {user ? (
            <>
            <p>{user.name}</p>
           
            <a href="/api/auth/logout">Logout</a>
            </>
           ) : (
           <a href="/api/auth/login">Login</a>
           )}
           </div>
        )}
      </div>
    <footer className={styles.footer}></footer>
    </Layout>
  </>
);
  }
