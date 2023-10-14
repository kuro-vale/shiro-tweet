import {useQuery} from "@apollo/client";
import {INDEX_QUERY} from "../graphql/queries";
import {Spin} from "antd";
import {IndexData} from "../types";
import {getDateMinimal} from "../utils";

function Home() {
  const {loading, error, data} = useQuery<IndexData>(INDEX_QUERY);
  if (loading) {
    return (
      <Spin spinning={loading}></Spin>
    );
  }
  if (error) {
    return (<>
      <h1 className="text-white">{error.message}</h1>
    </>);
  }
  const tweetList = data!.TweetQueries.index.map(tweet =>
    <li key={tweet.id} className="text-white">
      {tweet.body} - {getDateMinimal(tweet.createdAt)}
    </li>
  );
  return (
    <>
      {tweetList}
    </>
  );
}

export default Home;