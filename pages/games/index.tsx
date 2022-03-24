import React from "react";
import { Layout } from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../../src/database";
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async (context) => {
  const mongodb = await getDatabase();

  const games = await mongodb
  .collection("games")
  .find()
  .toArray();
  const data = JSON.parse(JSON.stringify(games));
  // console.log(data);
  

  return { 
    props: { 
      games: data,
      }
  }
}

  const Games: React.FC<{ games: any }> = ({ games }) => {
    const styles = {
      card: {
          width: "18rem"
     }
    }


    return (
      <>
        <Head>
          <title>List of games</title>
        </Head>
        <Layout>
          <div className="container">
          <h1>Games</h1>
          <div className="row d-flex justify-content-center">
            {games.map((games) => {
              return (
                <>
                <div className="card-footer text-muted text-center"></div>
                <Link href={`/games/${games.slug}`}>
                  <div className="card mr-3 mb-3" style={styles.card} key={games._id} >
                  <div className="card-body">
                    <h5 className="card-title">{games.name}</h5>
                    <a href="#" className="btn btn-outline-secondary w-100">Details</a>
                  </div>
                  </div>
                </Link>
                  <div>
                    {games.cover === undefined ? (
                      <img src="" alt="" />
                    ) : (
                      <img src={games.cover.url} className="card-img-top" style={styles.card} alt={games.name}/>
                    )}
                  </div>
                </>
              );
            })}
          </div> 
          </div>
        </Layout>
      </>
    );
  };

export default Games;