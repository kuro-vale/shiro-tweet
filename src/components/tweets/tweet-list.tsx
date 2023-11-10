import {useQuery} from "@apollo/client";
import {IndexData} from "../../types";
import {INDEX_QUERY} from "../../graphql/queries";
import {Spin} from "antd";
import ErrorResult from "../error-result";
import TweetCard from "./tweet-card";

function TweetList() {
  const {loading, error, data} = useQuery<IndexData>(INDEX_QUERY);
  if (loading) return (<Spin spinning={loading} className="min-h-[50vh]">
    <div></div>
  </Spin>);
  if (error) return (<ErrorResult message={error.message}/>);

  const tweetList = data?.TweetQueries.index.map(tweet =>
    <TweetCard key={tweet.id} tweet={tweet}/>
  );

  return (
    <ul>
      {tweetList}
    </ul>
  );
}

export default TweetList;