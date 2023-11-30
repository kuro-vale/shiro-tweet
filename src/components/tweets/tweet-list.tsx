import {DocumentNode, useQuery} from "@apollo/client";
import {Tweet, TweetData} from "../../types";
import {Button, Result, Spin, Typography} from "antd";
import ErrorResult from "../error-result";
import TweetCard from "./tweet-card";
import InfiniteScroll from "react-infinite-scroll-component";
import {ReactElement, useEffect, useState} from "react";
import {EXPLORE_ROUTE} from "../../constants";
import {COMMENTS_QUERY, INDEX_QUERY, USER_INDEX_QUERY} from "../../graphql/queries";

const {Text} = Typography;
type TweetListProps = {
  query: DocumentNode,
  tweetId?: number,
  userId?: number,
  showResult?: boolean,
}

function TweetList({query, tweetId, userId, showResult}: TweetListProps) {
  const [cursor, setCursor] = useState<number | null>(null);
  const [tweetCards, setTweetCards] = useState<ReactElement[]>([]);
  const {loading, error, data} = useQuery<TweetData>(query, {
    variables: {
      cursor,
      tweetId,
      userId,
    },
    fetchPolicy: "no-cache"
  });
  const [hasMore, setHasMore] = useState(true);

  let tweetList: Tweet[] | undefined;
  switch (query) {
    case INDEX_QUERY:
      tweetList = data?.TweetQueries.index;
      break;
    case COMMENTS_QUERY:
      tweetList = data?.TweetQueries.tweetComments;
      break;
    case USER_INDEX_QUERY:
      tweetList = data?.TweetQueries.indexUserTweets;
      break;
  }
  useEffect(() => {
    if (tweetList) {
      setTweetCards(tweets => [...tweets,
        ...tweetList!.map(tweet => {
            if (tweet) return (<TweetCard key={tweet.id} tweet={tweet}/>);
            else return <span key={0}></span>;
          }
        )]);
    }
  }, [tweetList]);

  if (loading && tweetCards.length === 0) return (<Spin spinning={loading} className="min-h-[50vh]">
    <div/>
  </Spin>);
  if (error) return (<ErrorResult message={error.message}/>);
  if (!loading && tweetList?.length === 0 && tweetCards.length === 0 && showResult) return (
    <Result
      title="Welcome to shiro-tweet"
      subTitle="Here you will see recent tweets of people you follow."
      extra={
        <Button shape="round" size="large" className="bg-primary hover:bg-hover-primary" href={EXPLORE_ROUTE}>
          <Text strong>Search</Text>
        </Button>
      }
    />);

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