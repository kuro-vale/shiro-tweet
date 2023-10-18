import {useQuery} from "@apollo/client";
import {IndexData} from "../types";
import {INDEX_QUERY} from "../graphql/queries";
import {Spin} from "antd";
import {getDateMinimal} from "../utils";
import ErrorResult from "./error-result";

function TweetList() {
  const {loading, error, data} = useQuery<IndexData>(INDEX_QUERY);
  if (loading) return (<Spin spinning={loading}></Spin>);
  if (error) return (<ErrorResult message={error.message}/>);

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

export default TweetList;