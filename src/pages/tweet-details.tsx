import TimelineLayout from "../components/layouts/timeline-layout";
import Aside from "../components/menus/aside";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {TWEET_BY_ID_QUERY} from "../graphql/queries";
import {Avatar, Spin, Typography} from "antd";
import ErrorResult from "../components/error-result";
import {TweetByIdData} from "../types";
import {useEffect, useRef, useState} from "react";
import ParentTweet from "../components/tweets/parent-tweet";
import UserPopover from "../components/users/user-popover";
import TweetButtons from "../components/tweets/tweet-buttons";
import {getDateDetails} from "../utils";

const {Text} = Typography;

function TweetDetails() {
  const {tweetId} = useParams();
  const {loading, error, data} = useQuery<TweetByIdData>(TWEET_BY_ID_QUERY, {
    variables: {
      tweetId: parseInt(tweetId!)
    }
  });
  const tweetRef = useRef<HTMLElement>(null);
  const tweet = data?.TweetQueries.tweetById;
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    tweetRef?.current?.scrollIntoView();
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, [tweet]);
  const [isFollowedByYou, setIsFollowedByYou] = useState(tweet?.author.isFollowedByYou);
  if (error) return (<ErrorResult message={error.message}/>);

  return (
    <>
      <TimelineLayout>
        <div className="sticky top-0 bg-transparency z-10 backdrop-blur-md h-14 flex items-center">
          {/*TODO: icon*/}
          <button className="w-14">{"<-"}</button>
          <Text strong className="text-xl">Tweet</Text>
        </div>
        {!tweet ? <Spin spinning={loading} className="min-h-[50vh]">
            <div/>
          </Spin> :
          <div className="px-4 pt-3 min-h-[150vh]">
            {tweet.parent && <ParentTweet tweet={tweet.parent} replying={false}/>}
            <article className="flex flex-col scroll-mt-[68px]" ref={tweetRef}>
              <div className="flex">
                <UserPopover user={tweet.author} isFollowedByYou={isFollowedByYou!}
                             setIsFollowedByYou={setIsFollowedByYou}>
                  <Avatar
                    src={`https://picsum.photos/seed/${tweet.author.username}/400/`}
                    size="large"
                    alt={tweet.author.username + " photo"}
                  />
                </UserPopover>
                <div className="ml-3 flex-1">
                  <UserPopover user={tweet.author} isFollowedByYou={isFollowedByYou!}
                               setIsFollowedByYou={setIsFollowedByYou}>
                    <div className="flex flex-col">
                      <Text strong className="h-[18px] hover:underline">{tweet.author.username}</Text>
                      <Text className="h-[18px] text-secondary"> @{tweet.author.username}</Text>
                    </div>
                  </UserPopover>
                </div>
              </div>
              <p className="mt-3"><Text className="whitespace-pre-line">{tweet.body}</Text></p>
              <p className="my-3"><Text className="text-secondary">{getDateDetails(tweet.createdAt)}</Text></p>
              <div className="border-y-[1px] border-y-border">
                <TweetButtons tweet={tweet}/>
              </div>
            </article>
          </div>
        }
        {/*TODO: comments*/}
      </TimelineLayout>
      <Aside showSearchBar={true}/>
    </>
  );
}

export default TweetDetails;