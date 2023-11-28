import {DocumentNode, useQuery} from "@apollo/client";
import {TweetData} from "../../types";
import {Spin} from "antd";
import ErrorResult from "../error-result";
import TweetCard from "./tweet-card";
import InfiniteScroll from "react-infinite-scroll-component";
import {ReactElement, useEffect, useState} from "react";

type TweetListProps = {
  query: DocumentNode,
  tweetId?: number,
}

function TweetList({query, tweetId}: TweetListProps) {
  const [cursor, setCursor] = useState<number | null>(null);
  const [tweetCards, setTweetCards] = useState<ReactElement[]>([]);
  const {loading, error, data} = useQuery<TweetData>(query, {
    variables: {
      cursor,
      tweetId
    },
    fetchPolicy: "no-cache"
  });
  const [hasMore, setHasMore] = useState(true);

  const tweetList = data?.TweetQueries.index || data?.TweetQueries.tweetComments;
  useEffect(() => {
    if (tweetList) {
      setTweetCards(tweets => [...tweets,
        ...tweetList.map(tweet => {
            if (tweet) return (<TweetCard key={tweet.id} tweet={tweet}/>);
            else return <span key={tweetList.length}></span>;
          }
        )]);
    }
  }, [tweetList]);

  if (loading && tweetCards.length === 0) return (<Spin spinning={loading} className="min-h-[50vh]">
    <div/>
  </Spin>);
  if (error) return (<ErrorResult message={error.message}/>);

  const handleNext = () => {
    if (tweetList) {
      const lastTweet = tweetList[tweetList.length - 1];
      if (lastTweet) {
        setCursor(lastTweet.id);
      } else setHasMore(false);
    }
  };

  return (
    <InfiniteScroll
      next={handleNext}
      hasMore={(tweetList?.length || 0) >= 10 && hasMore}
      loader={<Spin>
        <div className="min-h-[30vh]"/>
      </Spin>}
      dataLength={tweetCards.length}
      style={{overflow: "hidden"}}
      endMessage={<div className="min-h-[30vh]"/>}
    >
      <ul>
        {tweetCards}
      </ul>
    </InfiniteScroll>
  );
}

export default TweetList;