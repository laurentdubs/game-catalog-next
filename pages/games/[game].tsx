import { GetServerSideProps } from "next";
import { Head } from "next/document";
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
        <Head>
         <title>{games.name}</title>
        </Head>
        <div>
            <h1>{games.name}</h1>
            {/* <img src={games.cover.url}/> */}
        </div>
        
      </>
    );
  };
  
  export default game;
