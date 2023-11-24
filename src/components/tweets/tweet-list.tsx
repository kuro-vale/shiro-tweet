import {useQuery} from "@apollo/client";
import {IndexData} from "../../types";
import {INDEX_QUERY} from "../../graphql/queries";
import {Spin} from "antd";
import ErrorResult from "../error-result";
import TweetCard from "./tweet-card";
import InfiniteScroll from "react-infinite-scroll-component";
import {ReactElement, useEffect, useState} from "react";

function TweetList() {
  const [cursor, setCursor] = useState<number | null>(null);
  const [tweetList, setTweetList] = useState<ReactElement[]>([]);
  const {loading, error, data} = useQuery<IndexData>(INDEX_QUERY, {
    variables: {
      cursor
    },
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    if (data?.TweetQueries.index) {
      setTweetList(tweets => [...tweets,
        ...data.TweetQueries.index.map(tweet => (
          <TweetCard key={tweet.id} tweet={tweet}/>)
        )]);
    }
  }, [data]);

  if (loading && tweetList.length === 0) return (<Spin spinning={loading} className="min-h-[50vh]">
    <div/>
  </Spin>);
  if (error) return (<ErrorResult message={error.message}/>);

  const handleNext = () => {
    if (data?.TweetQueries.index) {
      setCursor(data.TweetQueries.index[data.TweetQueries.index.length - 1].id);
    }
  };

  return (
    <InfiniteScroll
      next={handleNext}
      hasMore={data?.TweetQueries.index.length === 10}
      loader={<Spin>
        <div className="min-h-[30vh]"/>
      </Spin>}
      dataLength={tweetList.length}
      style={{overflow: "hidden"}}
      endMessage={<div className="min-h-[30vh]"/>}
    >
      <ul>
        {tweetList}
      </ul>
    </InfiniteScroll>
  );
}

export default TweetList;