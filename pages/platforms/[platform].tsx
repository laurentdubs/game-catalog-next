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
                 <div key={game._id} className="d-flex flex-wrap p-1">
                  <Link href={`/games/${game.slug}`} passHref>
                    <div className="p-1">
                      <ul>
                        <li>
                          <h2>{game.name}</h2>
                        </li>
                        </ul>
                    </div>
                  </Link>
              
              {game.cover === undefined ? (
                <img src="" alt="" />
              ) : (
                <img src={game.cover.url} alt="" />
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
