import React from "react";
import { GetServerSideProps } from "next";
import { Head } from "next/document";
import Layout from "../../components/layout";
import { getDatabase } from "../../src/database";
import Link from "next/link";
import { Card } from "react-bootstrap";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mongodb = await getDatabase();

  const platform = await mongodb
  .collection("games")
  .find({"platform.name": context.params.platform})
  .toArray();
  const data = JSON.parse(JSON.stringify(platform));
  console.log("log", data);   
 
    return {
      props: {
        platform: data,
      },
    };
  }
  
  
const Platform: React.FC<{platform}> = ({ platform }) => {

  const styles = {
    titre: {
        fontSize: "40px"
    },
    image: {
        width: "200px"
    }
}

  return (
    <>
      {/* <Head>
          <title>{Platform.name}</title>
      </Head> */}
      <Layout>
        <div>
          <h1>{platform[0].platform.name}</h1>
          <div className="container">
              {platform.map((game) => {
                return (
                 <div key={game._id} className="card text-white mb-3">
                  <Link href={`/games/${game.slug}`} passHref>
                    <div className="card-header text-center bg-dark" style={styles.titre}>
                      <div className="col col-lg-8 p-3">
                          <div className="row">
                            <div className="col col-md-4 text-center">
                          <h2 className="card-title">{game.name}</h2>
                          <button className="btn btn-outline-secondary w-100">Game details</button>
                            </div>
                          </div>
                        </div>
                    </div>
                  </Link>
              
              {game.cover === undefined ? (
                <img src="" alt="" />
              ) : (
                <img src={game.cover.url} alt="" style={styles.image} />
              )}
              <p>{game.summary}</p>
              <hr />
          </div>
              );
              })}
        </div> 
        </div>
        
      </Layout>
    </>
  );
};


export default Platform;
