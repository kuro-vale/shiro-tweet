import {gql} from "@apollo/client";

export const INDEX_QUERY = gql`
  query Index($cursor: Int) {
    TweetQueries {
      index(cursor: $cursor) {
        id
        body
        author {
          id
          username
          followers
          following
          isFollowedByYou
          isFollowingYou
        }
        createdAt
        comments
        hearts
        retweets
        isHeartedByYou
        isRetweetedByYou
        parentId
        parent {
          id
          body
          author {
            id
            username
            followers
            following
            isFollowedByYou
            isFollowingYou
          }
          createdAt
          comments
          hearts
          retweets
          isHeartedByYou
          isRetweetedByYou
          parentId
        }
      }
    }
  }
`;

export const USER_INDEX_QUERY = gql`
  query IndexUserTweets($userId: Int!) {
    TweetQueries {
      indexUserTweets(userId: $userId) {
        id
        body
        author {
          id
          username
          followers
          following
          isFollowedByYou
          isFollowingYou
        }
        createdAt
        comments
        hearts
        retweets
        isHeartedByYou
        isRetweetedByYou
        parentId
        parent {
          id
          body
          author {
            id
            username
            followers
            following
            isFollowedByYou
            isFollowingYou
          }
          createdAt
          comments
          hearts
          retweets
          isHeartedByYou
          isRetweetedByYou
          parentId
        }
      }
    }
  }
`;

export const USER_TWEETS = gql`
  query QueryUserTweets($userId: Int!, $cursor: Int) {
    TweetQueries {
      queryUserTweets(userId: $userId, cursor: $cursor) {
        id
        body
        author {
          id
          username
          followers
          following
          isFollowedByYou
          isFollowingYou
        }
        createdAt
        comments
        hearts
        retweets
        isHeartedByYou
        isRetweetedByYou
        parentId
        parent {
          id
          body
          author {
            id
            username
            followers
            following
            isFollowedByYou
            isFollowingYou
          }
          createdAt
          comments
          hearts
          retweets
          isHeartedByYou
          isRetweetedByYou
          parentId
        }
      }
    }
  }
`;

export const COMMENTS_QUERY = gql`
  query TweetComments($tweetId: Int!, $cursor: Int) {
    TweetQueries {
      tweetComments(tweetId: $tweetId, cursor: $cursor) {
        id
        body
        author {
          id
          username
          followers
          following
          isFollowedByYou
          isFollowingYou
        }
        createdAt
        comments
        hearts
        retweets
        isHeartedByYou
        isRetweetedByYou
        parentId
      }
    }
  }
`;

export const WHO_USER_QUERY = gql`
  query WhoToFollow {
    UserQueries {
      searchUsers(filter: {username: ""}) {
        id
        username
        isFollowedByYou
        isFollowingYou
        following
        followers
      }
    }
  }
`;

export const GET_USER_QUERY = gql`
  query UserByUsername($username: String!) {
    UserQueries {
      userByUsername(username: $username) {
        id
        username
        tweets
        joined
        isFollowingYou
        isFollowedByYou
        hearts
        following
        followers
      }
    }
  }
`;

// Minified version of followers you may know
export const COMMON_FOLLOWERS = gql`
  query CommonFollowers($userId: Int!, $cursor: Int) {
    UserQueries {
      followersYouMayKnow(userId: $userId, cursor: $cursor) {
        id
        username
      }
    }
  }
`;

export const TWEET_BY_ID_QUERY = gql`
  query TweetById($tweetId: Int!) {
    TweetQueries {
      tweetById(tweetId: $tweetId) {
        id
        body
        author {
          id
          username
          followers
          following
          isFollowedByYou
          isFollowingYou
        }
        createdAt
        comments
        hearts
        retweets
        isHeartedByYou
        isRetweetedByYou
        parentId
        parent {
          id
          body
          author {
            id
            username
            followers
            following
            isFollowedByYou
            isFollowingYou
          }
          createdAt
          comments
          hearts
          retweets
          isHeartedByYou
          isRetweetedByYou
          parentId
        }
      }
    }
  }
`;
