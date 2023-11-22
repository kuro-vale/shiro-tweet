import {AuthContext} from "./contexts";
import {useContext, useState} from "react";
import {useMutation} from "@apollo/client";
import {HEART_MUTATION, RETWEET_MUTATION, UNHEART_MUTATION, UNRETWEET_MUTATION} from "./graphql/mutations";
import {handleError} from "./utils";
import {MessageInstance} from "antd/lib/message/interface";

export const useAuth = () => {
  return useContext(AuthContext);
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