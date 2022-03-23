import React from "react";
import { Layout } from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../../src/database";
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async (context) => {
  const mongodb = await getDatabase();

  const platforms = await mongodb.db()
  .collection("games")
  .find()
  .toArray();
  const data = JSON.parse(JSON.stringify(platforms));

  return { 
    props: { 
      platforms: data,
      }
    };
  }

  const Platforms: React.FC<{ platforms: any }> = ({ platforms }) => {
    return (
      <>
        <Head>
          <title>List of platforms</title>
        </Head>
        <Layout>
          <h1>Platforms</h1>
          <div>
            {platforms.map((platforms: { name; platform_logo_url; url}) => {
              return (
                <Link href={`/platforms/${platforms.name}`}> 
                  <div key={platforms.name}>
                    <p>{platforms.name}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Layout>
      </>
    );
  };

export default Platforms;