import { GetServerSideProps } from "next";
import { Head } from "next/document";
import Layout from "../../components/layout";
import { getDatabase } from "../../src/database";


export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log(context.params.game);

  const mongodb = await getDatabase();
  const games = await mongodb
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
  const styles = {
    titre: {
      fontSize: "40px",
    },
  };

  const screenshots = games.screenshots;

    return (
        <>
            <Layout>
                <div>
                    <h1>{games[0].name}</h1>
                </div>
                  <div className="container mt-5"></div>
                  <div className="card mt-5">
                    <div className="card-header text-center" style={styles.titre}>
                      {games.name}
                    </div>
                  <div>
                    <div className="card-body row">
                      <div className="col col-md-4 text-center d-flex justify-content-center">
                          <img className="align-self-center" src={games[0].cover.url} />
                      </div>
                      <div>
                        <p className="card-text m-3">{games[0].summary}</p>
                      </div>
                     </div>
                  </div>
                </div>
              <>
                {games[0].screenshots === undefined ? (
                  <div>
                     <img src="" alt="" />
                  </div>
                ) : (
                  <div>
                    {screenshots.map((screen) => {
                    return (
                      <div key={screen.url}>
                          <img className="d-block w-100" src={screen.url} alt="First slide" />
                      </div>
                    );
                    })}
                  </div>
                )}
              </>
            </Layout>
        </>
    );
};
  
  export default game;
