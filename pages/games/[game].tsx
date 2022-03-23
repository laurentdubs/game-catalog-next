import { GetServerSideProps } from "next";
import { Head } from "next/document";
import Layout from "../../components/layout";
import { getDatabase } from "../../src/database";


export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.params.game);

  const mongodb = await getDatabase();
  const games = await mongodb
    .db()
    .collection("games")
    .find({ slug: context.params.game })
    .toArray();
  const data = JSON.parse(JSON.stringify(games));

  return {
    props: {
      games: data,
        },
    };
};

const game = ({ games }) => {
    return (
        <>
            <Layout>
                <div>
                    <h1>{games[0].name}</h1>
                </div>
                <div>{games[0].summary}</div>
            </Layout>
        </>
    );
};
  
  export default game;
