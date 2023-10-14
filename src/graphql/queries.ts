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