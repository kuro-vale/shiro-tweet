import {useQuery} from "@apollo/client";
import {IndexData} from "../../types";
import {INDEX_QUERY} from "../../graphql/queries";
import {Spin} from "antd";
import ErrorResult from "../error-result";
import TweetCard from "./tweet-card";

function TweetList() {
  const {loading, error, data} = useQuery<IndexData>(INDEX_QUERY);
  if (error) return (<ErrorResult message={error.message}/>);

  const tweetList = data?.TweetQueries.index.map(tweet =>
    <TweetCard key={tweet.id} tweet={tweet}/>
  );

  return (
    <Spin spinning={loading}>
      <ul className="min-h-[50vh]">
        {tweetList}
      </ul>
    </Spin>
  );
}

export default TweetList;