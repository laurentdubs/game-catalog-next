import React from "react";
import { GetServerSideProps } from "next";
import { Head } from "next/document";
import Layout from "../../components/layout";
import { getDatabase } from "../../src/database";
import Link from "next/link";




export const getServerSideProps: GetServerSideProps = async (context) => {
    const mongodb = await getDatabase();

    const platforms = await mongodb
      .collection("games")
      .find({ "platform.name": context.params.platform })
      .toArray();
    const data = JSON.parse(JSON.stringify(platforms));
    console.log(data);
    
   
    return {
      props: {
        platform: {platforms: data},
      },
    };
}

  
const Platform: React.FC<{ platforms}> = ({ platforms}) => {

    return (
        <>
        {/* <Head>
            <title>{platforms.name}</title>
        </Head> */}
        <Layout>
        <div className="container mt-5">
          <h1>{platforms.name}</h1>
            <div className="text-center">
                {platforms.map((game) => {
                return (
                    <div key={game._id} className="flexItem">
                    <Link href={`/games/${game.slug}`}>
                        {game.name}
                    </Link>
    
                    {game.cover === undefined ? (
                        <a><img src="" alt=""/></a>
                ) : (
                        <a><img src={game.cover.url} className="card-img-top" alt={game.name}/></a>
                )}
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