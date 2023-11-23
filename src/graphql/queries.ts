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
