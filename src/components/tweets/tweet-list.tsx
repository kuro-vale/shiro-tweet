import {DocumentNode, useQuery} from "@apollo/client";
import {CursorTweet, FilterTweet, Tweet, TweetData} from "../../types";
import {Button, Result, Spin, Typography} from "antd";
import ErrorResult from "../error-result";
import TweetCard from "./tweet-card";
import InfiniteScroll from "react-infinite-scroll-component";
import {ReactElement, useEffect, useState} from "react";
import {EXPLORE_ROUTE} from "../../constants";
import {
  COMMENTS_QUERY,
  INDEX_QUERY,
  SEARCH_TWEETS_QUERY,
  USER_HEARTS,
  USER_INDEX_QUERY,
  USER_RETWEETS,
  USER_TWEETS
} from "../../graphql/queries";

const {Text} = Typography;
type TweetListProps = {
  query: DocumentNode,
  tweetId?: number,
  userId?: number,
  emptyMessage?: string,
  hideReplyMessage?: boolean,
  filterProp?: FilterTweet,
}

function TweetList({query, tweetId, userId, emptyMessage, hideReplyMessage, filterProp}: TweetListProps) {
  const [cursor, setCursor] = useState<number | null>(null);
  const [tweetCards, setTweetCards] = useState<ReactElement[]>([]);
  const [filter, setFilter] = useState<FilterTweet | undefined>(filterProp);
  const {loading, error, data} = useQuery<TweetData>(query, {
    variables: {
      cursor,
      tweetId,
      userId,
      filter,
    },
    fetchPolicy: "no-cache"
  });
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (filterProp?.body !== filter?.body) {
      setTweetCards([]);
      setCursor(null);
      setFilter(filterProp);
    }
  }, [filter, filterProp]);

  let tweetList: Tweet[] | undefined;
  let cursorTweetList: CursorTweet[] | undefined;
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
    case USER_TWEETS:
      tweetList = data?.TweetQueries.queryUserTweets;
      break;
    case USER_HEARTS:
      cursorTweetList = data?.TweetQueries.getUserHearts;
      break;
    case USER_RETWEETS:
      cursorTweetList = data?.TweetQueries.getUserRetweets;
      break;
    case SEARCH_TWEETS_QUERY:
      tweetList = data?.TweetQueries.searchTweets;
      break;
  }
  useEffect(() => {
    if (tweetList) {
      setTweetCards(tweets => [...tweets,
        ...tweetList!.map(tweet => {
            if (tweet) return (<TweetCard key={tweet.id} tweet={tweet} hideReplyMessage={hideReplyMessage}/>);
            else return <span key={0}></span>;
          }
        )]);
    } else if (cursorTweetList) {
      setTweetCards(tweets => [...tweets,
        ...cursorTweetList!.map(ct =>
          <TweetCard key={ct.cursorId} tweet={ct.tweet} hideReplyMessage={hideReplyMessage}/>)
      ]);
    }
  }, [cursorTweetList, hideReplyMessage, tweetList]);

  if (loading && tweetCards.length === 0) return (<Spin spinning={loading} className="min-h-[30vh]">
    <div/>
  </Spin>);
  if (error) return (<ErrorResult error={error}/>);
  if (!loading && (tweetList?.length === 0 || cursorTweetList?.length === 0) && tweetCards.length === 0 && emptyMessage)
    return (
      <Result
        title={emptyMessage}
        extra={
          <Button shape="round" size="large" className="bg-primary hover:bg-hover-primary" href={EXPLORE_ROUTE}>
            <Text strong>Explore</Text>
          </Button>
        }
      />);

  const handleNext = () => {
    if (tweetList) {
      const lastTweet = tweetList[tweetList.length - 1];
      if (lastTweet) {
        setCursor(lastTweet.id);
      } else setHasMore(false);
    } else if (cursorTweetList) {
      const lastCursorTweet = cursorTweetList[cursorTweetList.length - 1];
      if (lastCursorTweet) {
        setCursor(lastCursorTweet.cursorId);
      }
    }
  };

  return (
    <InfiniteScroll
      next={handleNext}
      hasMore={(tweetList?.length || cursorTweetList?.length || 0) >= 10 && hasMore}
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