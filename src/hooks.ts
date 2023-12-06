import {AuthContext, ProfileContext} from "./contexts";
import {useContext, useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {HEART_MUTATION, RETWEET_MUTATION, UNHEART_MUTATION, UNRETWEET_MUTATION} from "./graphql/mutations";
import {handleError} from "./utils";
import {MessageInstance} from "antd/lib/message/interface";
import {Tweet} from "./types";
import {useLocation, useNavigate} from "react-router-dom";
import {TWEET_DETAILS} from "./constants";

export const useAuth = () => {
  return useContext(AuthContext);
};

export const useProfile = () => {
  return useContext(ProfileContext);
};

export const useTitle = (title: string) => {
  useEffect(() => {
    if (!title.includes("undefined")) {
      document.title = title + " / shiro-tweet";
    }
  }, [title]);
};

export const useTweetToggles = (isHeartedByYouInitial: boolean, isRetweetedByYouInitial: boolean) => {
  const [isHeartedByYou, setIsHeartedByYou] = useState(isHeartedByYouInitial);
  const [isRetweetedByYou, setIsRetweetedByYou] = useState(isRetweetedByYouInitial);
  const [heart] = useMutation(HEART_MUTATION);
  const [unHeart] = useMutation(UNHEART_MUTATION);
  const [retweet] = useMutation(RETWEET_MUTATION);
  const [unRetweet] = useMutation(UNRETWEET_MUTATION);

  const toggleHeart = async (tweetId: number, messageApi: MessageInstance) => {
    try {
      if (!isHeartedByYou) {
        setIsHeartedByYou(true);
        await heart({variables: {tweetId: tweetId}});
      } else {
        setIsHeartedByYou(false);
        await unHeart({variables: {tweetId: tweetId}});
      }
    } catch (e) {
      await handleError(messageApi, e);
    }
  };

  const toggleRetweet = async (tweetId: number, messageApi: MessageInstance) => {
    try {
      if (!isRetweetedByYou) {
        setIsRetweetedByYou(true);
        await retweet({variables: {tweetId: tweetId}});
      } else {
        setIsRetweetedByYou(false);
        await unRetweet({variables: {tweetId: tweetId}});
      }
    } catch (e) {
      await handleError(messageApi, e);
    }
  };

  return {isHeartedByYou, isRetweetedByYou, toggleHeart, toggleRetweet};
};

export const useTweetVars = (tweet: Tweet) => {
  const {user} = useAuth();
  const [isFollowedByYou, setIsFollowedByYou] = useState(tweet.author.isFollowedByYou);
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    let selection = window.getSelection();
    if (!selection?.toString().trim()) {
      const tweetRoute = TWEET_DETAILS
        .replace(":tweetId", `${tweet.id}`)
        .replace(":username", tweet.author.username);
      navigate(tweetRoute, {replace: location.pathname === tweetRoute});
    }
  };

  const handleDelete = () => {
    window.location.reload();
  };

  return {user, isFollowedByYou, setIsFollowedByYou, handleClick, handleDelete};
};