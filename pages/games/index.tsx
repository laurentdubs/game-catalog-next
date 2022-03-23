import React, { ReactChild, ReactFragment, ReactPortal } from "react";
import { Layout } from "../../components/layout";
import Head from "next/head";
import Link from "next/link";
import { getDatabase } from "../../src/database";
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async () => {
  const mongodb = await getDatabase();

  const games = await mongodb.db()
  .collection("games")
  .find()
  .toArray();
  const data = JSON.parse(JSON.stringify(games));

  return { 
    props: { 
      games: data,
      }
    };
  }

  const Games: React.FC<{ games: any }> = ({ games }) => {
    return (
      <>
        <Head>
          <title>List of games</title>
        </Head>
        <Layout>
          <h1>Games</h1>
          <div>
            {games.map((games: { slug; _id; name; summary}) => {
              return (
                <Link href={`/games/${games.slug}`}>
                  <div key={games._id}>
                    <h1>{games.name}</h1>
                    <div>{games.summary}</div>
                    <hr />
                    <div>SLUG: {games.slug}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </Layout>
      </>
    );
  };

export default Games;