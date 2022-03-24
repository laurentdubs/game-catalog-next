import React from "react";
import { Layout } from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../../src/database";
import { GetServerSideProps } from "next";



export async function getServerSideProps () {
    const mongodb = await getDatabase();

    const games = await mongodb.collection("games").find().toArray();
    const data = JSON.parse(JSON.stringify(games))

    const arr = games
          .map((e) => e.platform)
          .filter((e) => e !== undefined);

        const platforms = arr.reduce(
          (acc, current) => {
            const x = acc.find((item) => item.name === current.name);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          },
          [arr[0]]
        );
        // console.log(platforms);
        

    return {
        props: {
            platforms: JSON.parse(JSON.stringify(platforms))
        }
    }
}



const Platforms: React.FC<{ platforms: any }> = ({platforms}) => {

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
        
            <Head>
                <title>List of Platforms</title>
            </Head>
            <Layout>
                 <div className="container">
                    <h1>Platforms</h1>
                    {platforms.map(platform => (
                        <div className="card text-white mb-3" key={platform.name}>
                            <div className="card-header text-center bg-dark" style={styles.titre}>{platform.name}</div>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col col-md-4 text-center ">
                                        {platform.platform_logo}
                                            <img src={platform.platform_logo} style={styles.image}/>  
                                        </div>
                                            <div className="col col-lg-8 p-3">
                                                <h4  className="card-title">{platform.name}</h4>
                                            </div>
                                    </div>
                                </div>

                                    <div>
                                        <Link href={`/platforms/${platform.name}`}>
                                            <button className="btn btn-outline-secondary w-100">Game details</button>
                                        </Link>
                                    </div>
                        </div>
                    ))
                    }
                </div>
            </Layout> 
        </>
    )
}

export default Platforms;