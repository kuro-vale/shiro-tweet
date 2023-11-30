import TimelineLayout from "../components/layouts/timeline-layout";
import Aside from "../components/menus/aside";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {COMMENTS_QUERY, TWEET_BY_ID_QUERY} from "../graphql/queries";
import {Avatar, Spin, Typography} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import ErrorResult from "../components/error-result";
import {TweetByIdData} from "../types";
import {useEffect, useRef, useState} from "react";
import ParentTweet from "../components/tweets/parent-tweet";
import UserPopover from "../components/users/user-popover";
import TweetButtons from "../components/tweets/tweet-buttons";
import {getDateDetails} from "../utils";
import ComposeTweet from "../components/tweets/compose-tweet";
import TweetList from "../components/tweets/tweet-list";
import {NOT_FOUND_ROUTE, TWEET_DETAILS} from "../constants";
import {useTitle} from "../hooks";

const {Text} = Typography;

function TweetDetails() {
  const {tweetId, username} = useParams();
  if (!/^[0-9]+$/.test(tweetId!)) window.location.href = NOT_FOUND_ROUTE;
  const navigate = useNavigate();
  const {loading, error, data} = useQuery<TweetByIdData>(TWEET_BY_ID_QUERY, {
    variables: {
      tweetId: parseInt(tweetId!)
    },
    fetchPolicy: "no-cache"
  });
  const tweetRef = useRef<HTMLElement>(null);
  const tweet = data?.TweetQueries.tweetById;
  useTitle(`${tweet?.author.username}: ${tweet?.body}`);
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    tweetRef?.current?.scrollIntoView();
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, [tweet]);
  useEffect(() => {
    if (tweet && username !== tweet.author.username) {
      navigate(TWEET_DETAILS
          .replace(":tweetId", `${tweet.id}`)
          .replace(":username", tweet.author.username),
        {replace: true});
    }
  }, [navigate, tweet, username]);
  const [isFollowedByYou, setIsFollowedByYou] = useState(tweet?.author.isFollowedByYou);
  if (error) return (<ErrorResult message={error.message}/>);
  if (!loading && !tweet) window.location.href = NOT_FOUND_ROUTE;

  return (
    <>
      <TimelineLayout>
        <div className="sticky top-0 bg-transparency z-10 backdrop-blur-md h-14 flex items-center pl-3">
          <button
            type="button" className="text-center mr-9 hover:bg-hover-menu rounded-full w-9 h-9"
            onClick={() => navigate(-1)}
          >
            <ArrowLeftOutlined className="text-lg"/>
          </button>
          <Text strong className="text-xl">Tweet</Text>
        </div>
        {!tweet ? <Spin spinning={loading} className="min-h-[50vh]">
            <div/>
          </Spin> :
          <>
            <div className="px-4 pt-3 border-b-[1px] border-b-border">
              {tweet.parent && <ParentTweet tweet={tweet.parent} replying={false}/>}
              <article className="flex flex-col scroll-mt-[68px]" ref={tweetRef}>
                <div className="flex">
                  <UserPopover user={tweet.author} isFollowedByYou={isFollowedByYou!}
                               setIsFollowedByYou={setIsFollowedByYou}>
                    <Avatar
                      src={`https://picsum.photos/seed/${tweet.author.username}/400/`}
                      size="large"
                      alt={tweet.author.username + " photo"}
                      className="bg-gray"
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
                  <TweetButtons tweet={tweet} xl={true}/>
                </div>
              </article>
              <div className="mt-4 mb-2">
                <ComposeTweet tweet={tweet} sm={true}/>
              </div>
            </div>
          </>
        }
        <div className="min-h-[100vh]">
          {tweet && <TweetList query={COMMENTS_QUERY} tweetId={tweet.id}/>}
        </div>
      </TimelineLayout>
      <Aside showSearchBar={true}/>
    </>
  );
}

export default TweetDetails;